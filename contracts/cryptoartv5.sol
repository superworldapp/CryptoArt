pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "https://github.com/kole-swapnil/openzepkole/token/ERC721/ERC721.sol";
import "https://github.com/kole-swapnil/openzepkole/access/Ownable.sol";

contract SuperArt is ERC721, Ownable {
    using SafeMath for uint256;  
    uint totalBalance  = 0;
    uint public buyId = 0;
    string public metaUrl; 
    uint256 public percentageCut;
    address payable public SuperWorldWallet;
    
    constructor(uint _percentageCut,string memory _metaurl) ERC721("SuperArt", "SUPERART") public { // Constructor ("SuperArt", "SUPERART")
            percentageCut = _percentageCut;
            metaUrl = _metaurl;
            SuperWorldWallet = 0x9aE048c47aef066E03593D5Edb230E3fa80c3f17;
            
        } 
        
    function setPercentCut(uint _percent) public {
                percentageCut = _percent;
        }
    
    function setMetaUrl(string memory _url) public {
                metaUrl = _url;
        }
    
    //Batch Start
    uint256 tokenBatchIndex; //Batch ID
    mapping(uint256 => string) public tokenBatch; // Key -> Batch ID  : Value -> Batch Hash
    mapping(uint256 => string) public tokenBatchName; // Key -> Batch ID  : Value -> Batch Title
    mapping(uint256 => uint256) public tokenBatchEditionSize; // Key -> Batch ID  : Value -> how many tokens can we mint in the same batch (group)
    mapping(uint256 => uint256) public totalMintedTokens; // Key -> Batch ID  : Value -> ERC721 tokens already minted under same batch
    mapping(uint256 => address) public tokenCreator; // Key -> Batch ID : value ->address of creator
    mapping(uint256 => string) public imgUrl; // Key -> Batch ID : value ->imgUrl
    mapping(uint256 => address payable [5]) public royaltyAddressMemory; // Key -> Batch ID  : Value -> creator (artist) address
    mapping(uint256 => uint256[5]) public royaltyPercentageMemory;  // Key -> Batch ID  : Value -> percentage cut  for artist and owner
    mapping(uint256 => uint256) public royaltyLengthMemory; // Key -> Batch ID  : Value -> Number of royalty parties (ex. artist1, artist2)
    mapping(uint256 => bool) public openminting; // Key -> Batch ID  : Value -> minting open or not
    mapping(uint256 => uint256) tokenBatchPrice; // Key -> Batch ID  : Value -> price of Batch
    //Batch end
    
    //Token
    mapping(uint256 => address) tokenOwner;
    mapping(uint256 => bool) public isSellings;
    mapping(uint256 => uint256) public sellPrices;
    mapping(uint256 => uint256) public tokenEditionNumber;
    mapping(uint256 => uint256) public referenceTotokenBatch;
    mapping(uint256 => Auction) public auctions;
    //Token end
    
    
      struct Auction{
                address payable bidder;
                uint bidprice;
                bool isBidding;
                uint bidend;
            }

    
    //Event
    event NewtokenBatchCreated(string tokenHash, string tokenBatchName,  uint256 editionSize,uint256 price, uint256 tokenBatchIndex, address creator);
    event AddtokenBatchRoyalties(uint256 tokenBatchId, uint256 count);
    event ClearRoyalties(uint256 tokenBatchId);
    event mintingstatus(uint256 tokenBatchToUpdate, uint256 price,bool isopenminting);
    event tokenputforsale(uint indexed tokenId,address indexed seller,uint sellPrice,bool isListed,uint times);
    event tokenbid(uint indexed tokenId,address indexed stcl,bool isBid,uint close,uint times);
    event bidstarted(uint indexed tokenId,address indexed stcl,uint tokenPrice,uint times);
    event tokenbought(uint indexed tokenId,address indexed newowner,address indexed seller,uint times,uint tokenPrice);
    //Event
    
    modifier ownertoken(uint256 tokenBatchId){
        require(tokenCreator[tokenBatchId] == msg.sender);
        _;
    } 


	// Use : Creates a token batch
    // Input : token hash, batch name, edition size, price, and imageURL
    // Output : New token batch with hash, name, size, price, and imageUrl
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
     
    // Used for Opening/Closing a minting session
    // Input : toke price, bool (True Opening minting session/False = Closing minting session)
    // Output : Mintting status 
    function openCloseMint(uint256 tokenBatchToUpdate, uint256 _price,bool _open) public ownertoken(tokenBatchToUpdate){
            openminting[tokenBatchToUpdate] = _open; 
            tokenBatchPrice[tokenBatchToUpdate] = _price; 
            emit mintingstatus(tokenBatchToUpdate, _price/10**18,_open); 
        }
     
    // Use : Adds up to finve addresses to recieve royalty percentages
    // Input : Token Batch Id, array of adresses, array of percentages
    // Output :  Added royalties and there percentages 
    function addTokenBatchRoyalties(uint256 tokenBatchId, address[] memory _royaltyAddresses, uint256[] memory _royaltyPercentage) public ownertoken(tokenBatchId){
            require(_royaltyAddresses.length == _royaltyPercentage.length); 
            require(_royaltyAddresses.length <= 5); 
            
            uint256 totalCollaboratorRoyalties;	
            for(uint256 i=0; i<_royaltyAddresses.length; i++){ 
                royaltyAddressMemory[tokenBatchId][i] = payable(_royaltyAddresses[i]); 
                royaltyPercentageMemory[tokenBatchId][i] = _royaltyPercentage[i]; 
                totalCollaboratorRoyalties += _royaltyPercentage[i]; 
            }
            
            royaltyLengthMemory[tokenBatchId] = _royaltyAddresses.length;
            
            emit AddtokenBatchRoyalties(tokenBatchId, _royaltyAddresses.length);
        }

    // Use : Getter function for royalty addresses and proyalty percerntages 
	// Input : Token Batch ID
    // Output : Puts royalty adresses and royalty percentages into two seperate arrays 
    function getRoyalties(uint256 tokenBatchId) public view returns (address[5] memory addresses, uint256[5] memory percentages) {
            for(uint256 i=0; i<royaltyLengthMemory[tokenBatchId]; i++){
                addresses[i] = royaltyAddressMemory[tokenBatchId][i]; 
                percentages[i] = royaltyPercentageMemory[tokenBatchId][i]; 
            }    
        }

    // Use : Removes royalties only owner of the batch can do this  
    // Input : Token Batch ID
    // Output : Removes all royalty adresses 
    function clearRoyalties(uint256 tokenBatchId) public ownertoken(tokenBatchId) {
            for(uint256 i=0; i<royaltyLengthMemory[tokenBatchId]; i++){
                royaltyAddressMemory[tokenBatchId][i] = 0x0000000000000000000000000000000000000000;
                royaltyPercentageMemory[tokenBatchId][i] = 0;
            }
            
            royaltyLengthMemory[tokenBatchId] = 0;
            
            emit ClearRoyalties(tokenBatchId);
        }
    
    // Use : Minting new tokens from batch   
    // Input : Token Batch ID, minting amount
    // Output : minted token(s)
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
               
            }
                
            }
        }
        
    // Use : List token for sell (It you want to resell you re-list)
    // Input : Token ID, selling price, is lisred should be true
    // Output : Token ID, sellprice, if it is listed, timestamp     
    function Sale(uint256 _tokenId,uint _sellprice,bool isListed) public{
            uint256 x = referenceTotokenBatch[_tokenId];
            require(tokenCreator[x] == msg.sender);
            isSellings[_tokenId] = isListed;
            sellPrices[_tokenId] = _sellprice;
            emit tokenputforsale(_tokenId,msg.sender,_sellprice,isListed,now);
        }
    
    
    function MoreSale(uint256[] memory _tokens,uint _sellprice,bool _isListed) public {
        for(uint i=0;i<_tokens.length;i++){
            Sale(_tokens[i],_sellprice,_isListed);
        }
    }
        
    // Use : Gets all information about the batch from the Token Batch ID
    // Input : Token Batch ID
    // Output : Token hash, token batch name, token batch edition size, token creator, and image URL      
    function getTokenBatchData(uint256 tokenBatchId) public view returns (string memory _tokenHash, string memory _tokenBatchName, uint256 _unmintedEditions,address _tokenCreator,string memory _imgurl) {
            _tokenHash = tokenBatch[tokenBatchId];
            _tokenBatchName = tokenBatchName[tokenBatchId];
            _unmintedEditions = tokenBatchEditionSize[tokenBatchId] - totalMintedTokens[tokenBatchId];
            _tokenCreator = tokenCreator[tokenBatchId];
            _imgurl = imgUrl[tokenBatchId];
            
        }
    
    // Use : Gets all information about the batch from the Token ID
    // Input : Token id 
    // Output : Token hash, token batch name, token batch edition size, token creator, and image URL   
    function getTokenDataBatch(uint256 tokenId) public view returns (string memory _tokenHash, string memory _tokenBatchName,address _tokenCreator,string memory _imgurl) {
            require(_exists(tokenId), "Token does not exist.");
            uint256 tokenBatchRef = referenceTotokenBatch[tokenId];
            
            _tokenHash = tokenBatch[tokenBatchRef];
            _tokenBatchName = tokenBatchName[tokenBatchRef];
            _tokenCreator = tokenCreator[tokenBatchRef];
            _imgurl = imgUrl[tokenBatchRef];
            
        }
    
    // Use : Gets all information about a token from the Token ID
    // Input : Token ID
    // Output : Token owner, if it is currently for sale, sell price, referefence to its token batch, auctions, token bidder, if it is bidding, and bid price
    function getTokenData(uint256 tokenId) public view returns(address _tokenOwner,bool _isSellings,uint _sellprice,uint _refbatch,address _tokenbidder,bool _isBidding,uint _bidprice){
            _tokenOwner = tokenOwner[tokenId];
            _isSellings = isSellings[tokenId];
            _sellprice = sellPrices[tokenId];
            _refbatch = referenceTotokenBatch[tokenId];
            Auction memory y = auctions[tokenId];
            _tokenbidder = y.bidder;
            _isBidding = y.isBidding;
            _bidprice = y.bidprice;
            
        }

    // Use : Start a bid 
    // Input : Token ID and start price 
    // Output : Calls tokenbid event by giving token ID, address, setting event to true, 1(represents the creator), and time stamp
     function startbid(uint _tokenId,uint256 _startprice,uint _times) public {
                auctions[_tokenId].bidend = _times;
                auctions[_tokenId].isBidding = true;
                auctions[_tokenId].bidprice = _startprice;
                emit tokenbid(_tokenId,msg.sender,true,1,block.timestamp); 
            }
    
    // Use : Add a bid to auction
    // Input : Token ID 
    // Output : Calls bidstarted event by giving token id, bidder adress, bid ammount, and timestamp     
    function addBid(uint _tokenId) public payable{
                require(auctions[_tokenId].isBidding);
                require(msg.value>auctions[_tokenId].bidprice);
                if(auctions[_tokenId].bidder == address(0x0)){
                    auctions[_tokenId].bidder = msg.sender;
                    auctions[_tokenId].bidprice = msg.value;
                    auctions[_tokenId].isBidding = true;
                    emit bidstarted(_tokenId,msg.sender,msg.value,now);
                    
                }
                else{
                    (auctions[_tokenId].bidder).transfer(auctions[_tokenId].bidprice);
                    auctions[_tokenId].bidder = msg.sender;
                    auctions[_tokenId].bidprice = msg.value;
                    emit bidstarted(_tokenId,msg.sender,msg.value,now);
                }
                
        }
    
    // Use : Allows super world to close a bid
    // Input : Token ID 
    // Output : Calls tokenbid event by giving token ID, adress, sets bidding to false, 2(represents Super World) and, timestamp 
    function closeBid(uint _tokenId)public{
                 require(auctions[_tokenId].bidend < now);
                 require(auctions[_tokenId].bidder == msg.sender);
                 auctions[_tokenId].bidder.transfer(auctions[_tokenId].bidprice);
                 auctions[_tokenId].bidder = address(0x0);
                 auctions[_tokenId].bidprice = 0;
                 emit tokenbid(_tokenId,msg.sender,false,2,block.timestamp);
            }
    
    // Use : Getter function for token URL
    // Input : Token Id
    // Output : Striong URL  
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
                return string(abi.encodePacked(metaUrl,integerToString(tokenId)));
            
            }
     
    // Use : Buy a token
    // Input : Token ID
    // Output : Calls _buyToken event by giving Token ID, address, buy amount, and 1(represents the creator)          
    function buyToken(uint256 _tokenId) public payable returns(bool){
                require(isSellings[_tokenId]);
                require(msg.value >= sellPrices[_tokenId]);
                return _buyToken(_tokenId,msg.sender,msg.value,1);
            }
            
     
    // Use : Buy a token
    // Input : Token ID, address that will be paid, cost amount, and 1(represents the creator)
    // Output : Boolean          
    function _buyToken(uint256 _tokenId,address payable addr,uint256 val,uint8 _type) private returns(bool){
               uint256 totalmoney = val;
               address payable royaltyperson;
               uint256 royaltyper;
               uint256 x;
               uint8 typebuy = _type;
               uint256 batchId = referenceTotokenBatch[_tokenId];
               for(uint256 i=0; i<royaltyLengthMemory[batchId]; i++){
                royaltyperson = royaltyAddressMemory[batchId][i];
                royaltyper = royaltyPercentageMemory[batchId][i];
                x = SafeMath.div(
                    SafeMath.mul(val,royaltyper),
                    100
                );
                totalmoney = SafeMath.sub(totalmoney, x);
                royaltyperson.transfer(x);
                }
                uint fee = SafeMath.div(
                    SafeMath.mul(val, percentageCut),
                    100
                );
                totalmoney = SafeMath.sub(totalmoney, fee);
                totalBalance += fee;
                address payable seller = payable(tokenOwner[_tokenId]);
                seller.transfer(totalmoney);
                tokenOwner[_tokenId] = addr;
                isSellings[_tokenId] = false;
                sellPrices[_tokenId] = 0;
                if(typebuy == 1){
                    emit tokenputforsale(_tokenId,seller,0,false,now);
                }
                auctions[_tokenId].isBidding = false;
                auctions[_tokenId].bidder = address(0x0);
                auctions[_tokenId].bidprice = 0;
                if(typebuy == 2){
                    emit tokenbid(_tokenId,seller,true,2,block.timestamp); 
                }
                _holderTokens[seller].remove(_tokenId);
                _holderTokens[addr].add(_tokenId);
                emit tokenbought(_tokenId,addr,seller,block.timestamp,val);
                return true;
            }
    
    // Use : Close bid by owner
    // Input : Token ID
    // Output : Calls _buytoken event by giving Token ID, bidder,bid price, and 2(triggers a two in _buytoken function)
    function closeBidOwner(uint _tokenId)public returns(bool){
                require(auctions[_tokenId].bidend < now);
                require(auctions[_tokenId].isBidding);
                return _buyToken(_tokenId,auctions[_tokenId].bidder,auctions[_tokenId].bidprice,2);
            }
    
    // Use : Withdrawal funds from buyer 
    // Input : None
    // Output : Transfer iniated 
    function withdrawBalance() public payable onlyOwner() {
                (msg.sender).transfer(totalBalance);
            }
     
    // Use : Withdrawal funds from Super World
    // Input : None
    // Output : Transfer iniated          
    function FinalWithdrawBal() public payable onlyOwner() {
                uint256 balance = address(this).balance;
                (msg.sender).transfer(balance);
            }
        
    // Use : Converts an integer to a string
    // Input : Integer 
    // Output : String         
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
