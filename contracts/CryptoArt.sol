        pragma solidity ^0.6.0;
        pragma experimental ABIEncoderV2;
        
        import "https://github.com/kole-swapnil/openzepkole/token/ERC721/ERC721.sol";
        import "https://github.com/kole-swapnil/openzepkole/access/Ownable.sol";
        
        
        contract Cryptoart is ERC721,Ownable{
            uint256 public percentageCut;
            // uint256 public buyId = 0;
            // uint256 public listId = 0;
            uint256 public tokenCount = 0;
            string public metaUrl;
            
            
            constructor(uint _percentageCut,string memory _metaurl) public ERC721("SuperArt", "SUPERART"){
                percentageCut = _percentageCut;
                metaUrl = _metaurl;
            }
            
            event tokencreated(uint indexed tokenId,address indexed tokenCreator,uint tokenPrice,uint times);
            event tokenbought(uint indexed tokenId,address indexed newowner,address indexed seller,uint times);
            event tokenputforsale(uint indexed tokenId,address indexed seller,uint sellPrice,bool isListed,uint times);
            
            struct ArtToken{
                uint tokenIdentifier;
                string tokenHash;
                address payable tokenCreator;
                address payable tokenOwner;
                bool isSelling;
                uint tokenPrice;
                uint tokenSellPrice;
                string imgurl;
                uint percut;
                string tokenTitle;
            }
            
            mapping(uint => ArtToken) public Arts;
            mapping(address => uint[]) public owntokens;
            
            function setPercentCut(uint _percent) public {
                percentageCut = _percent;
            }
            function setmetaurl(string memory _url) public {
                metaUrl = _url;
            }
            
            function createToken(
                address buyer,
                uint256 tokenId
            ) private {
                _mint(buyer, tokenId);
            }
            
            function getInfo(uint _tokenId) public view returns(ArtToken memory){
                return(Arts[_tokenId]);
            }
            
           function create(string memory _tokenHash,string memory _tokenTitle,uint _tokenPrice,string memory _imgurl,uint _percut)public returns(bool){
                tokenCount++;
                ArtToken memory y;
                y.tokenIdentifier = tokenCount;
                y.tokenHash = _tokenHash;
                y.tokenCreator = msg.sender;
                y.tokenOwner = msg.sender;
                y.isSelling = false;
                y.percut = _percut;
                y.tokenPrice = _tokenPrice;
                y.imgurl = _imgurl;
                y.tokenTitle = _tokenTitle;
                Arts[tokenCount] = y;
                createToken(msg.sender,tokenCount);
                emit tokencreated(tokenCount,msg.sender,_tokenPrice,now);
               
            }

            
            function putforsale(uint256 _tokenId,uint _sellprice) public{
                Arts[_tokenId].isSelling = true;
                Arts[_tokenId].tokenSellPrice = _sellprice;
                emit tokenputforsale(_tokenId,msg.sender,_sellprice,true,now);
                
            }
                function desale(uint256 _tokenId) public{
                Arts[_tokenId].isSelling = false;
                emit tokenputforsale(_tokenId,msg.sender,0,false,now);
            }
            
            function buyToken(uint256 _tokenId) public payable returns(bool){
                return _buyToken(_tokenId);
            }
            
            function _buyToken(uint256 _tokenId) private returns(bool){
               ArtToken memory y = Arts[_tokenId];
               require(msg.value >= y.tokenSellPrice);
               uint fee;
               uint priceAfterFee;
               uint creatorfee;
               uint profit;
               if(y.tokenOwner == y.tokenCreator){
                    fee = SafeMath.div(
                    SafeMath.mul(y.tokenSellPrice, percentageCut),
                    100
                );
                priceAfterFee = SafeMath.sub(y.tokenSellPrice, fee);
                y.tokenCreator.transfer(priceAfterFee);
                   
               }
               else{
                   fee = SafeMath.div(
                    SafeMath.mul(y.tokenSellPrice,percentageCut),
                    100
                );
                profit =  SafeMath.sub(y.tokenSellPrice, y.tokenPrice);
                
                creatorfee = SafeMath.div(
                    SafeMath.mul(profit,y.percut),
                    100
                );
                
                priceAfterFee = SafeMath.sub(profit, fee);
                   y.tokenCreator.transfer(creatorfee);
                   y.tokenOwner.transfer(priceAfterFee);
               }
               address seller = y.tokenOwner;
               y.tokenOwner = msg.sender;
               y.isSelling = false;
               y.tokenPrice = y.tokenSellPrice;
                Arts[_tokenId] = y;
                
               emit tokenbought(_tokenId,msg.sender,seller,now);
                return true;
            }
            
            function getmytokens() public returns(uint[] memory){
                delete owntokens[msg.sender];
                for(uint i=1;i<=tokenCount;i++){
                    if(Arts[i].tokenOwner == msg.sender){
                        owntokens[msg.sender].push(i);
                    }
                }
                return owntokens[msg.sender]; 
            }
            function tokenURI(uint256 tokenId) public view override returns (string memory) {
            string memory x = string(abi.encodePacked(metaUrl,tokenId));
            return x;
            }
            
        }