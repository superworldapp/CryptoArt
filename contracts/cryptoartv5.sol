pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "https://github.com/kole-swapnil/openzepkole/token/ERC721/ERC721.sol";
import "https://github.com/kole-swapnil/openzepkole/access/Ownable.sol";

contract SuperArt is ERC721, Ownable {
    using SafeMath for uint256;  
    uint totalBalance  = 0;
    uint public buyId = 0;
    address payable public SuperWorldWallet;
    
    constructor() ERC721("SuperArt", "SUPERART") public { // Constructor ("SuperArt", "SUPERART")
            //updateURI("https://joyworld.azurewebsites.net/api/HttpTrigger?id="); // for each ERC721 token id
            //updatetokenBatchURI("https://joyworldmulti.azurewebsites.net/api/HttpTrigger?id=", "&tokenIndex="); // for each ERC721 token id with batch details with offset
            SuperWorldWallet = 0x9aE048c47aef066E03593D5Edb230E3fa80c3f17;
            
        } 
        
    //Batch Start
    uint256 tokenBatchIndex; //Batch ID
    mapping(uint256 => string) public tokenBatch; // Key -> Batch ID  : Value -> Batch Hash
    mapping(uint256 => string) public tokenBatchName; // Key -> Batch ID  : Value -> Batch Title
    mapping(uint256 => uint256) public tokenBatchEditionSize; // Key -> Batch ID  : Value -> how many tokens can we mint in the same batch (group)
    mapping(uint256 => uint256) public totalMintedTokens; // Key -> Batch ID  : Value -> ERC721 tokens already minted under same batch
    mapping(uint256 => address) public tokenCreator; // Key -> Batch ID : value ->address of creator
    mapping(uint256 => string) public imgUrl; // Key -> Batch ID : value ->imgUrl
    mapping(uint256 => address[5]) public royaltyAddressMemory; // Key -> Batch ID  : Value -> creator (artist) address
    mapping(uint256 => uint256[5]) public royaltyPercentageMemory;  // Key -> Batch ID  : Value -> percentage cut  for artist and owner
    mapping(uint256 => uint256) public royaltyLengthMemory; // Key -> Batch ID  : Value -> Number of royalty parties (ex. artist1, artist2, superworld)
    mapping(uint256 => bool) public openminting; // Key -> Batch ID  : Value -> minting open or not
    mapping(uint256 => uint256) tokenBatchPrice; // Key -> Batch ID  : Value -> price of Batch
    //Batch end
    
    //Token
    mapping(uint256 => address) tokenOwner;
    mapping(uint256 => bool) public isSellings;
    mapping(uint256 => uint256) public sellPrices;
    mapping(uint256 => uint256) public tokenEditionNumber;
    mapping(uint256 => uint256) public referenceTotokenBatch;
    mapping(uint256 => uint256) public buyIds;         
    
    //Token end
    
    
    
    //   struct Panel{
    //                 uint memcount;
    //                 address[] allmem;
    //                 uint panelprice;
    //                 uint countcritic;
    //         }
    //   struct Auction{
    //             address payable bidder;
    //             uint bidprice;
    //             bool isBidding;
    //         }
    //   struct ArtToken{
    //             uint tokenIdentifier;
    //             address payable tokenOwner;
    //             bool isSelling;
    //             uint tokenSellPrice;
    //             Panel panel;
    //             Auction auction;
    //             uint batchId;
    //         }
    
    
    //Event
    event NewtokenBatchCreated(string tokenHash, string tokenBatchName,  uint256 editionSize,uint256 price, uint256 tokenBatchIndex, address creator);
    event AddtokenBatchRoyalties(uint256 tokenBatchId, uint256 count);
    event ClearRoyalties(uint256 tokenBatchId);
    event mintingstatus(uint256 tokenBatchToUpdate, uint256 price,bool isopenminting);
    event tokenputforsale(uint indexed tokenId,address indexed seller,uint sellPrice,bool isListed,uint times);
    
    
    //Event
    
    modifier ownertoken(uint256 tokenBatchId){
        require(tokenCreator[tokenBatchId] == msg.sender);
        _;
    }    
    function createtokenBatch(string memory _tokenHash,  string memory _tokenBatchName,  uint256 _editionSize, uint256 _price, string memory _imgURL) public {
            tokenBatchIndex++ ;
            tokenBatch[tokenBatchIndex] = _tokenHash;
            tokenBatchName[tokenBatchIndex] = _tokenBatchName;
            tokenBatchEditionSize[tokenBatchIndex] = _editionSize;
            totalMintedTokens[tokenBatchIndex] = 0;
            tokenBatchPrice[tokenBatchIndex] = _price;
            imgUrl[tokenBatchIndex] = _imgURL;
            tokenCreator[tokenBatchIndex] = msg.sender; 
            emit NewtokenBatchCreated(_tokenHash, _tokenBatchName, _editionSize, _price, tokenBatchIndex,msg.sender);
        }
        
    function openCloseMint(uint256 tokenBatchToUpdate, uint256 _price,bool _open) public ownertoken(tokenBatchToUpdate){
            openminting[tokenBatchToUpdate] = _open;
            tokenBatchPrice[tokenBatchToUpdate] = _price;
            emit mintingstatus(tokenBatchToUpdate, _price/10**18,_open);
        }
        
    function addTokenBatchRoyalties(uint256 tokenBatchId, address[] memory _royaltyAddresses, uint256[] memory _royaltyPercentage) public ownertoken(tokenBatchId){
            require(_royaltyAddresses.length == _royaltyPercentage.length);
            require(_royaltyAddresses.length <= 5);
            
            uint256 totalCollaboratorRoyalties;
            for(uint256 i=0; i<_royaltyAddresses.length; i++){
                royaltyAddressMemory[tokenBatchId][i] = _royaltyAddresses[i];
                royaltyPercentageMemory[tokenBatchId][i] = _royaltyPercentage[i];
                totalCollaboratorRoyalties += _royaltyPercentage[i];
            }
            
            royaltyLengthMemory[tokenBatchId] = _royaltyAddresses.length;
            
            emit AddtokenBatchRoyalties(tokenBatchId, _royaltyAddresses.length);
        }
        
    function getRoyalties(uint256 tokenBatchId) public view returns (address[5] memory addresses, uint256[5] memory percentages) {
            for(uint256 i=0; i<royaltyLengthMemory[tokenBatchId]; i++){
                addresses[i] = royaltyAddressMemory[tokenBatchId][i];
                percentages[i] = royaltyPercentageMemory[tokenBatchId][i];
            }    
        }
        
    function clearRoyalties(uint256 tokenBatchId) public ownertoken(tokenBatchId) {
            for(uint256 i=0; i<royaltyLengthMemory[tokenBatchId]; i++){
                royaltyAddressMemory[tokenBatchId][i] = 0x0000000000000000000000000000000000000000;
                royaltyPercentageMemory[tokenBatchId][i] = 0;
            }
            
            royaltyLengthMemory[tokenBatchId] = 0;
            
            emit ClearRoyalties(tokenBatchId);
        }
    
    function mintTokenBatch(uint256 tokenBatchId, uint256 amountToMint) public  {
            if(openminting[tokenBatchId]){
            require(totalMintedTokens[tokenBatchId] + amountToMint <= tokenBatchEditionSize[tokenBatchId]);
            for(uint256 i=totalMintedTokens[tokenBatchId]; i<amountToMint + totalMintedTokens[tokenBatchId]; i++) {
                  uint256 tokenId = totalSupply() + 1;
                _safeMint(msg.sender, tokenId);
                tokenOwner[tokenId] = msg.sender;
                referenceTotokenBatch[tokenId] = tokenBatchId;
                tokenEditionNumber[tokenId] = i + 1;
                totalMintedTokens[tokenBatchId]++;
                buyIds[tokenId]++;
               
            }
            }
            else{
                require(tokenCreator[tokenBatchId] == msg.sender);
                require(totalMintedTokens[tokenBatchId] + amountToMint <= tokenBatchEditionSize[tokenBatchId]);
            for(uint256 i=totalMintedTokens[tokenBatchId]; i<amountToMint + totalMintedTokens[tokenBatchId]; i++) {
                uint256 tokenId = totalSupply() + 1;
                _safeMint(msg.sender, tokenId);
                tokenOwner[tokenId] = msg.sender;
                referenceTotokenBatch[tokenId] = tokenBatchId;
                tokenEditionNumber[tokenId] = i + 1;
                totalMintedTokens[tokenBatchId]++;
                buyIds[tokenId]++;
               
            }
                
            }
        }
        
    function Sale(uint256 _tokenId,uint _sellprice,bool isListed) public{
            uint256 x = referenceTotokenBatch[_tokenId];
            require(tokenCreator[x] == msg.sender);
            isSellings[_tokenId] = isListed;
            sellPrices[_tokenId] = _sellprice;
            emit tokenputforsale(_tokenId,msg.sender,_sellprice,true,now);
        }
        
    function getTokenBatchData(uint256 tokenBatchId) public view returns (string memory _tokenHash, string memory _tokenBatchName, uint256 _unmintedEditions,address _tokenCreator,string memory _imgurl) {
            _tokenHash = tokenBatch[tokenBatchId];
            _tokenBatchName = tokenBatchName[tokenBatchId];
            _unmintedEditions = tokenBatchEditionSize[tokenBatchId] - totalMintedTokens[tokenBatchId];
            _tokenCreator = tokenCreator[tokenBatchId];
            _imgurl = imgUrl[tokenBatchId];
            
        }
    
    function getTokenDataBatch(uint256 tokenId) public view returns (string memory _tokenHash, string memory _tokenBatchName,address _tokenCreator,string memory _imgurl) {
            require(_exists(tokenId), "Token does not exist.");
            uint256 tokenBatchRef = referenceTotokenBatch[tokenId];
            
            _tokenHash = tokenBatch[tokenBatchRef];
            _tokenBatchName = tokenBatchName[tokenBatchRef];
            _tokenCreator = tokenCreator[tokenBatchRef];
            _imgurl = imgUrl[tokenBatchRef];
            
        }
    
    function getTokenData(uint256 tokenId) public view returns(address _tokenOwner,bool _isSellings,uint _sellprice,uint _refbatch){
            _tokenOwner = tokenOwner[tokenId];
            _isSellings = isSellings[tokenId];
            _sellprice = sellPrices[tokenId];
            _refbatch = referenceTotokenBatch[tokenId];
        }

    
    
    
    function integerToString(uint _i) internal pure returns (string memory) {
            if (_i == 0) {
                return "0";
            }
            
            uint j = _i;
            uint len;
        
            while (j != 0) {
                len++;
                j /= 10;
            }
        
            bytes memory bstr = new bytes(len);
            uint k = len - 1;
        
            while (_i != 0) {
                bstr[k--] = byte(uint8(48 + _i % 10));
                _i /= 10;
            }
        return string(bstr);
        }
    
}
