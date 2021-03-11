const CryptoArtContract = require("./Cryptoart.json");
const Web3 = require("web3");
let instance;
let accounts;

Mount = async () => {
    const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
      );
    //console.log(CryptoArtContract);

     const web3 = new Web3(provider);
     web3.eth.getAccounts((err, accounts) => { currentAccount = accounts[0]})
     const accounts = await web3.eth.getAccounts();
     //console.log(accounts)
     const networkId = await web3.eth.net.getId();
     const deployedNetwork = CryptoArtContract.networks[networkId];
     instance = new web3.eth.Contract(
     CryptoArtContract.abi,
     deployedNetwork && deployedNetwork.address,
    );

    //console.log("instance",instance);
    //console.log("accounts",currentAccount);

//aer();
//setMetaUrl();
//getMetaUrl()
//createtokenBatch()
//numberofBatch()
//openCloseMint()
//addTokenBatchRoyalties() 
//getRoyalties(1)
//clearRoyalties(1) 
//mintTokenBatch() // works 
//mintToken()
//Sale() // works 
//getTokenBatchData()
//getTokenDataBatch() //works 
//getTokenData()
//startbid() // works
//addBid() //Need working ID
//closeBid() //Need working ID
//tokenURI()
//buyToken() //Need working ID
closeBidOwner()
//withdrawBalance() // 
//FinalWithdrawBal() // 
//totalSupply()
}

Mount();

aer = async() => {
    const res = await instance.methods.percentageCut().call();
    console.log(res);
    console.log(accounts)
}

totalSupply = async() => {
  const res = await instance.methods.totalSupply().call();
  console.log(res);
  console.log(accounts)
}

setMetaUrl = async() => {
    const res = await instance.methods.setMetaUrl("nftsalon/").send({from: currentAccount,gas : 1000000});
    console.log(res)
}
getMetaUrl = async() => {
  const res = await instance.methods.metaUrl().call();
  console.log(res);
  console.log(accounts)
}
numberofBatch = async() => {
  const res = await instance.methods.tokenBatchIndex().call();
  console.log(res);
  console.log(accounts)
}

createtokenBatch = async() => {
  //createtokenBatch(string memory _tokenHash,  string memory _tokenBatchName,  uint256 _editionSize, uint256 _price, string memory _imgURL, string memory _imgThumbnail)
    // const res = await instance.methods.createtokenBatch().send();
    // console.log(res)
    let tokenHash = "OX60" //this.state.artHash.toString();
    let tokenTitle = "Test" //this.state.title;
    let editionSize = 5
    let tokenPrice = 10//(this.state.price * ETHER).toString();
    let imgUrl = "//" //x;
    let imgThumbnail = "//"
    //let nos = "abc"//this.state.nos;
    console.log(tokenHash, tokenTitle, tokenPrice, imgUrl);
    
    try {
    //function createtokenBatch(string memory _tokenHash,  string memory _tokenBatchName,  uint256 _editionSize, uint256 _price, string memory _imgURL)
      const res = await instance.methods
        .createtokenBatch(
          tokenHash,
          tokenTitle,
          editionSize,
          tokenPrice,
          imgUrl,
          imgThumbnail
          //nos
        )
        .send({ from: currentAccount, gas: 5000000 });

      console.log('res', res);
      let data;
    } catch(error){
        console.error(error)
    }
}

openCloseMint = async() => {
    let tokenBatchToUpdate = 1
    let price = 5 
    let open = true

    try {
     //function openCloseMint(uint256 tokenBatchToUpdate, uint256 _price,bool _open) public ownertoken(tokenBatchToUpdate){
      const res = await instance.methods
        .openCloseMint(
          tokenBatchToUpdate,
          price,
          open,
        )
        .send({ from: currentAccount, gas: 5000000 });

      console.log('res', res);
      let data;
    } catch(error){
        console.error(error)
    }
}

addTokenBatchRoyalties = async() => {
    let tokenBatchId = 1
    let royaltyAddresses = ["0xb8d99b112fB6FFff82db081Cb581cd4aE7766548", "0x0b087e53380ed39609464c02E86ADE5090b9f9dF"]
    let royaltyPercentage = [10,5]
    try {
     //function addTokenBatchRoyalties(uint256 tokenBatchId, address[] memory _royaltyAddresses, uint256[] memory _royaltyPercentage)
      const res = await instance.methods
        .addTokenBatchRoyalties(
          tokenBatchId,
          royaltyAddresses,
          royaltyPercentage,
        )
        .send({ from: currentAccount, gas: 5000000 });
      console.log('res', res);
      let data;
    } catch(error){
        console.error(error)
    }
}

getRoyalties = async(n) => {
  const res = await instance.methods.getRoyalties(n).call();
  console.log(res);
}

clearRoyalties = async(n) => {
      let tokenBatchId = n
      try {
        const res = await instance.methods
          .clearRoyalties(
            tokenBatchId
          )
          .send({ from: currentAccount, gas: 5000000 });
        console.log('res', res);
        let data;
      } catch(error){
          console.error(error)
      }
  }

mintTokenBatch = async() => {
  // const res = await instance.methods.createtokenBatch().send();
  // console.log(res)
  let tokenBatchId = 1//this.state.artHash.toString();
  let amountToMint = 1 //this.state.title;
  
  try {
  //function mintTokenBatch(uint256 tokenBatchId, uint256 amountToMint) 
    const res = await instance.methods
      .mintTokenBatch(
        tokenBatchId,
        amountToMint,
    
      )
      .send({ from: currentAccount, gas: 5000000 });

    console.log('res', res);
    let data;
  } catch(error){
      console.error(error)
  }
}

mintToken = async() => {
  let tokenBatchId = 1//this.state.artHash.toString();
  
  try {
  //function mintTokenBatch(uint256 tokenBatchId, uint256 amountToMint) 
    const res = await instance.methods
      .mintToken(
        tokenBatchId,
      )
      .send({ from: currentAccount, gas: 5000000 });

    console.log('res', res);
    let data;
  } catch(error){
      console.error(error)
  }
}

Sale = async() => {
  let tokenId = 1 
  let sellprice = "1000000000000000000" 
  let isListed = true
  try {
  //function Sale(uint256 _tokenId,uint _sellprice,bool isListed)
    const res = await instance.methods
      .Sale(
        tokenId,
        sellprice,
        isListed,
      )
      .send({ from: currentAccount, gas: 5000000 });

    console.log('res', res);
    let data;
  } catch(error){
      console.error(error)
  }
}

getTokenBatchData = async() => {
  const res = await instance.methods.getTokenBatchData(1).call();
  console.log(res);
}

getTokenDataBatch = async() => {
  const res = await instance.methods.getTokenDataBatch(1).call();
  console.log(res);
}

getTokenData = async() => {
  const res = await instance.methods.getTokenData(1).call();
  console.log(res);
}

startbid = async() => {
  let tokenId = 1
  let startprice = "1000000000000000000"  
  let times = 1615401942 //bid end time 7 days
  
  try {
  // function startbid(uint _tokenId,uint256 _startprice) public
    const res = await instance.methods
      .startbid(
        tokenId,
        startprice,
        times
      )
      .send({ from: currentAccount, gas: 5000000 });
    console.log('res', res);
    let data;
  } catch(error){
      console.error(error)
  }
}
//function addBid(uint _tokenId) public payable
addBid = async() => {
  let tokenId = 1
  try {
    const res = await instance.methods
      .addBid(
        tokenId,
      )
      .send({ from: currentAccount, gas: 5000000, value: "1200000000000000000" });
    console.log('res', res);
    let data;
  } catch(error){
      console.error(error)
  }
}

closeBid = async() => {
  let tokenId = 1 
  try {
    const res = await instance.methods
      .closeBid(
        tokenId,
      )
      .send({ from: currentAccount, gas: 5000000 });
    console.log('res', res);
    let data;
  } catch(error){
      console.error(error)
  }
}

tokenURI = async() => {
  const res = await instance.methods.tokenURI(1).call();
  console.log(res);
}

buyToken = async() => {
  let tokenId = 1 
  try {
  //function Sale(uint256 _tokenId,uint _sellprice,bool isListed)
    const res = await instance.methods
      .buyToken(
        tokenId,
      )
      .send({ from: currentAccount, gas: 5000000 });
    console.log('res', res);
    let data;
  } catch(error){
      console.error(error)
  }
}

closeBidOwner = async() => {
  let tokenId = 1
  try {
    const res = await instance.methods
      .closeBidOwner(
        tokenId
      )
      .send({ from: currentAccount, gas: 5000000 });
    console.log('res', res);
    let data;
  } catch(error){
      console.error(error)
  }
}

withdrawBalance = async() => {
  const res = await instance.methods.withdrawBalance().send({from: currentAccount,gas : 1000000});
  console.log(res)
}
FinalWithdrawBal = async() => {
  const res = await instance.methods.FinalWithdrawBal().send({from: currentAccount,gas : 1000000});
  console.log(res)
}

// addingCustomer = async(name,pinc) => {
//     const res = await instance.methods.addCustomer(name,pinc).send({from: accounts[1],gas : 1000000});
//     console.log(res);
// }
// updatingCustomer = async(name,pinc) => {
//     const res = await instance.methods.modifyCustomer(name,pinc).send({from: accounts[1],gas : 1000000});
//     console.log(res);
// }

// creatingItems = async(itemtype,desc,price,gst,model) => {
//     const res = await instance.methods.createItems(itemtype,desc,price,gst,model).send({from: accounts[0],gas : 1000000});
//     console.log(res);
// }
// creatingShipment = async(itemid,qty,shipstate,totalamt,payment,manadr) => {
//     const res = await instance.methods.createShipment(itemid,qty,shipstate,totalamt,payment,manadr).send({from: accounts[1],gas : 1000000});
//     console.log(res);
// }

// updateShipstate = async(shipid,shipstate) => {
//     const res = await instance.methods.updateShstate(shipid,shipstate).send({from: accounts[1],gas : 1000000});
//     console.log(res);
// }

// updateShipstatus = async(shipid,paystatus) => {
//     const res = await instance.methods.updateShstate(shipid,paystatus).send({from: accounts[1],gas : 1000000});
//     console.log(res);
// }

// conver = async (x) => {
//     console.log(Web3.utils.toWei(x, 'milli'));
// }

// converb = async (x) => {
//     console.log(Web3.utils.fromWei(x, 'milli'));
// }

// // conver('1000');
// // converb('1000000000000000000'); 
        

// getshipevents = async(instance) => {
//     const req = await instance.getPastEvents('processchange', {
//         filter: { ship_id: 1 },
//         fromBlock: 0,    
//     });
//     req.forEach(async (ele) => {
        
//         const ship_id = (ele.returnValues.ship_id);
//         const shstate = (ele.returnValues.shstate);
//         const times = (ele.returnValues.times);
//         console.log("item : ",ship_id,shstate,times);
//     });
    
// }
// getpayevents = async(instance) => {
//     const req1 = await instance.getPastEvents('processpay', {
        
//         fromBlock: 0,
//     });
//     req1.forEach(async (ele) => {
        
//          const ship_id = (ele.returnValues.ship_id);
//          const paystate = (ele.returnValues.pay);
//          const times = (ele.returnValues.times);
//         console.log("item : ",ship_id,paystate,times);
//     });
// }
    
    
// // }

// //  dopayment = async(totalamt,shipid,totalamt) => {
// //      const res = await instance.methods.payitem(totalamt,shipid).send({from: accounts,value:totalamt,gas : 1000000});
// //      console.log(res);
// //  }
