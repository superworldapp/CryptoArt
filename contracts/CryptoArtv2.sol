pragma solidity ^0.6.0;
 pragma experimental ABIEncoderV2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract JOYtoys is ERC721, Ownable {
    using SafeMath for uint256;    

    uint256 JOYtoyIndex; //Batch ID
    address payable public joyWallet; //SupwerWorld address (contract owner)
    
    mapping(uint256 => string[30]) JOYtoyArtwork; // Key -> Batch ID  : Value -> Batch Name
    mapping(uint256 => string[30]) artworkTypeMemory;  // Key -> Batch ID  : Value -> Batch type
    mapping(uint256 => address[5]) royaltyAddressMemory; // Key -> Batch ID  : Value -> creator (artist) address
    mapping(uint256 => uint256[5]) royaltyPercentageMemory;  // Key -> Batch ID  : Value -> percentage cut  for artist and owner

    mapping(uint256 => string) toyNameMemory; // Key -> Batch ID  : Value -> Batch Name
    mapping(uint256 => string) featuresMemory; // Key -> Batch ID  : Value -> Batch description (features)
    mapping(uint256 => uint256) editionSizeMemory; // Key -> Batch ID  : Value -> how many tokens can we mint in the same batch (group)
    // mapping(uint256 => string) powerMemory;
    mapping(uint256 => uint256) editionNumberMemory; // to check later
    mapping(uint256 => uint256) totalCreated; // Key -> Batch ID  : Value -> How many tokens are created in the same batch
    mapping(uint256 => uint256) totalMinted; // Key -> Batch ID  : Value -> ERC721 tokens already minted under same batch
    mapping(uint256 => uint256) priceMemory; // Key -> ERC721 token : value ->token price
    mapping(uint256 => uint256) royaltyLengthMemory; // Key -> Batch ID  : Value -> Number of royalty parties (ex. artist1, artist2, superworld)
    mapping(uint256 => uint256) royaltyMemory; // to check later
    mapping(uint256 => uint256) artworkJOYtoyReference; // Key -> ERC Token Id : Value -> Batch Id
    mapping (uint256 => uint256) artworkOffset ; //NEW: Key -> ERC Token Id : Value -> tokenId offset within some batch

    // mapping(uint256 => uint256) joyCollabTokenId;    
    // mapping(uint256 => address) joyHolderCollaborator;
    // mapping(uint256 => bool) joyHolderCollabActive;
    // mapping(uint256 => uint256) joyHolderCollabPercent;
     mapping(uint256 => string) collaboratorNamesMemory; //Key -> Batch ID  : Value -> all collaborators who have made the artwork

    string JOYtoyURI1; // token URI
    string JOYtoyURI2; // token URI
    
    address public joyContractAddress; // contract address

    constructor() ERC721("JOYWORLD JOYtoys", "JOYtoy") public { // Constructor ("SuperArt", "SUPERART")
        updateURI("https://joyworld.azurewebsites.net/api/HttpTrigger?id="); // for each ERC721 token id
        updateJOYtoyURI("https://joyworldmulti.azurewebsites.net/api/HttpTrigger?id=", "&artworkIndex="); // for each ERC721 token id with batch details with offset
        joyWallet = 0x9aE048c47aef066E03593D5Edb230E3fa80c3f17;
        joyContractAddress = 0x6c7B6cc55d4098400aC787C8793205D3E86C37C9;
    }  

    event NewJOYtoyCreated(string artworkHash, string artworkType, string toyName, string feature, uint256 editionSize, uint256 price, uint256 royalty, uint256 JOYtoyIndex);
    event AddJOYtoyRoyalties(uint256 JOYtoyId, uint256 count);
    event ClearRoyalties(uint256 JOYtoyId);
    event NewArtworkAdded(uint256 JOYtoyToUpdate, string artworkHash, string artworkType, uint256 artworkIndex);  
    event UpdateFeature(uint256 JOYtoyToUpdate, string newFeatures);
    event UpdatePrice(uint256 JOYtoyToUpdate, uint256 price);

    function createJOYtoy(string memory artworkHash, string memory artworkType,  string memory toyName, string memory feature, uint256 editionSize, uint256 price, uint256 royalty) public onlyOwner {
        JOYtoyIndex++ ;
        JOYtoyArtwork[JOYtoyIndex][1] = artworkHash;
        artworkTypeMemory[JOYtoyIndex][1] = artworkType;
        //powerMemory[JOYtoyIndex] = power;
        toyNameMemory[JOYtoyIndex] = toyName;
        featuresMemory[JOYtoyIndex] = feature;
        editionSizeMemory[JOYtoyIndex] = editionSize;
        totalCreated[JOYtoyIndex] = 0;
        totalMinted[JOYtoyIndex] = 0;
        priceMemory[JOYtoyIndex] = price;
        royaltyMemory[JOYtoyIndex] = royalty;
        emit NewJOYtoyCreated(artworkHash, artworkType, toyName, feature, editionSize,  price, royalty, JOYtoyIndex);
    }
    
    /*
    /@params: JOYtoyId is batch id
    */
    function addJOYtoyRoyalties(uint256 JOYtoyId, address[] memory royaltyAddresses, uint256[] memory royaltyPercentage, string memory collaboratorNames) public onlyOwner {
        require(royaltyAddresses.length == royaltyPercentage.length);
        require(royaltyAddresses.length <= 5);
        
        uint256 totalCollaboratorRoyalties;
        collaboratorNamesMemory[JOYtoyId] = collaboratorNames;
        
        for(uint256 i=0; i<royaltyAddresses.length; i++){
            royaltyAddressMemory[JOYtoyId][i] = royaltyAddresses[i];
            royaltyPercentageMemory[JOYtoyId][i] = royaltyPercentage[i];
            totalCollaboratorRoyalties += royaltyPercentage[i];
        }
        
        royaltyLengthMemory[JOYtoyId] = royaltyAddresses.length;
        
        emit AddJOYtoyRoyalties(JOYtoyId, royaltyAddresses.length);
    }

    /*
    /@params: JOYtoyId is batch id
    */
    
    function getRoyalties(uint256 JOYtoyId) public view returns (address[5] memory addresses, uint256[5] memory percentages) {
        for(uint256 i=0; i<royaltyLengthMemory[JOYtoyId]; i++){
            addresses[i] = royaltyAddressMemory[JOYtoyId][i];
            percentages[i] = royaltyPercentageMemory[JOYtoyId][i];
        }    
    }

/*  // Colaborators can give away its own share of the artWork to another collector
    function addJOYCollector(uint256 JOYtoyId, uint256 joyTokenId, uint256 joyCollectorPercent, bool collectorActive) public onlyOwner {
        joyCollabTokenId[JOYtoyId] = joyTokenId;
        joyHolderCollaborator[JOYtoyId] = originalJOYOwner(joyTokenId);
        joyHolderCollabPercent[JOYtoyId] = joyCollectorPercent;
        joyHolderCollabActive[JOYtoyId] = collectorActive;
        
        emit AddJOYCollector(JOYtoyId, joyTokenId, joyCollectorPercent, collectorActive);
    }
    
    function getJoyCollaborator(uint256 JOYtoyId) public view returns (uint256 joyTokenId, address joyTokenHolder, uint256 joyCollectorPercent, bool collectorActive) {
        joyTokenId = joyCollabTokenId[JOYtoyId];
        joyTokenHolder = joyHolderCollaborator[JOYtoyId];
        joyCollectorPercent = joyHolderCollabPercent[JOYtoyId];
        collectorActive = joyHolderCollabActive[JOYtoyId];
    }
    
*/

    /*
    /@params: JOYtoyId is batch id
    */
    function clearRoyalties(uint256 JOYtoyId) public onlyOwner {
        for(uint256 i=0; i<royaltyLengthMemory[JOYtoyId]; i++){
            royaltyAddressMemory[JOYtoyId][i] = 0x0000000000000000000000000000000000000000;
            royaltyPercentageMemory[JOYtoyId][i] = 0;
        }
        
        collaboratorNamesMemory[JOYtoyId] = "";
        royaltyLengthMemory[JOYtoyId] = 0;
        
        emit ClearRoyalties(JOYtoyId);
    }
    
    /*
    /@params: JOYtoyToUpdate is batch id
    */
    // check the access right. Remove onlyOwner to allow artist to call the function?
    function addJOYtoyArtwork(uint256 JOYtoyToUpdate, string memory artworkHash, string memory artworkType, uint256 _artworkIndex) public onlyOwner{
        require(totalCreated[JOYtoyToUpdate] < 30);
        JOYtoyArtwork[JOYtoyToUpdate][_artworkIndex] = artworkHash;
        artworkTypeMemory[JOYtoyToUpdate][_artworkIndex] = artworkType;
        emit NewArtworkAdded(JOYtoyToUpdate, artworkHash, artworkType, _artworkIndex);
    }

    /*
    /@params: JOYtoyToUpdate is batch id
    */
    function updateFeature(uint256 JOYtoyToUpdate, string memory newFeatures) public onlyOwner{
        featuresMemory[JOYtoyToUpdate] = newFeatures; 
        emit UpdateFeature(JOYtoyToUpdate, newFeatures);
    }
    
    /*
    /@params: JOYtoyToUpdate is ERC721 tokenId
    */
    function updatePrice(uint256 JOYtoyToUpdate, uint256 price) public onlyOwner{
        priceMemory[JOYtoyToUpdate] = price;
        emit UpdatePrice(JOYtoyToUpdate, price/10**18);
    }
    
    /*
    /@params: JOYtoyId is batch id
    */
    function mintJOYtoy(uint256 JOYtoyId, uint256 amountToMint) public onlyOwner {
        require(totalMinted[JOYtoyId] + amountToMint <= editionSizeMemory[JOYtoyId]);
        for(uint256 i=totalMinted[JOYtoyId]; i<amountToMint + totalMinted[JOYtoyId]; i++) {
            uint256 tokenId = totalSupply() + 1;
            artworkJOYtoyReference[tokenId] = JOYtoyId;
            editionNumberMemory[tokenId] = i + 1;
            _safeMint(msg.sender, tokenId);
            totalMinted[JOYtoyId]++;
            artworkOffset[tokenId] = totalMinted[JOYtoyId];
        }
    }

    function withdrawFunds() public onlyOwner {
        msg.sender.transfer(address(this).balance);
    }

    /*
    /@params: JOYtoyId is batch id and index is artworkOffset
    */
    function getJOYtoyArtworkData(uint256 JOYtoyId, uint256 index) public view returns (string memory artworkHash, string memory artworkType, uint256 unmintedEditions) {
        artworkHash = JOYtoyArtwork[JOYtoyId][index];
        artworkType = artworkTypeMemory[JOYtoyId][index];
        unmintedEditions = editionSizeMemory[JOYtoyId] - totalMinted[JOYtoyId];
    }

    /*
    /@params: tokenId is ERC721 tokenId
    */
    function getMetadata(uint256 tokenId) public view returns (string memory toyName, uint256 editionSize, uint256 editionNumber, string memory feature, uint256 price, string memory collaborators) {
        require(_exists(tokenId), "Token does not exist."); // checks ERC721 token exists
        uint256 JOYtoyRef = artworkJOYtoyReference[tokenId]; //checks wich batch token belongs to
        
        toyName = toyNameMemory[JOYtoyRef];
        editionSize = editionSizeMemory[JOYtoyRef];
        editionNumber = editionNumberMemory[tokenId];
        feature = featuresMemory[JOYtoyRef];
        price = priceMemory[JOYtoyRef];
        collaborators = collaboratorNamesMemory[JOYtoyRef];
    }

/*    
    function getRoyaltyData(uint256 tokenId) public view returns (address artistAddress, uint256 royaltyFeeById) {
        require(_exists(tokenId), "Token does not exist.");
        uint256 JOYtoyRef = artworkJOYtoyReference[tokenId];
        
        //artistAddress = joyWallet; 
        royaltyFeeById = royaltyMemory[JOYtoyRef];
    }
*/    

    /*
    /@params: tokenId is ERC721 tokenId and index is artworkOffset
    */    
    function getArtworkData(uint256 tokenId, uint256 index) public view returns (string memory artworkHash, string memory artworkType) {
        require(_exists(tokenId), "Token does not exist.");
        uint256 JOYtoyRef = artworkJOYtoyReference[tokenId];
        
        artworkHash = JOYtoyArtwork[JOYtoyRef][index];
        artworkType = artworkTypeMemory[JOYtoyRef][index];        
    }
/*
   function updatePaymentWallet(address payable newWallet) public onlyOwner {
        joyWallet = newWallet;
    }
*/   
    function updateURI(string memory newURI) public onlyOwner {
        _setBaseURI(newURI);
    }
    
    function updateJOYtoyURI(string memory newURI1, string memory newURI2) public onlyOwner {
        JOYtoyURI1 = newURI1;
        JOYtoyURI2 = newURI2;
    }

    /*
    /@params: ERC721 tokenId and artworkIndex is artworkOffset
    */    
    function JOYtoyURI(uint256 tokenId, uint256 artworkIndex) external view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(JOYtoyURI1, integerToString(tokenId), JOYtoyURI2, integerToString(artworkIndex)));
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