const CryptoArtContract = require("./Cryptoart.json");
const Web3 = require("web3");
let instance;
let accounts;

Mount = async () => {
    const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
      );
    console.log(CryptoArtContract);

     const web3 = new Web3(provider);
     web3.eth.getAccounts((err, accounts) => { currentAccount = accounts[0]})
     const accounts = await web3.eth.getAccounts();
     const networkId = await web3.eth.net.getId();
     const deployedNetwork = CryptoArtContract.networks[networkId];
     instance = new web3.eth.Contract(
     CryptoArtContract.abi,
     deployedNetwork && deployedNetwork.address,
    );

    console.log("instance",instance);
    console.log("accounts",networkId);

aer();
}


Mount();

aer = async() => {
    const res = await instance.methods.percentageCut().call();
    console.log(res);
}
// addingManufacturer = async(name,pinc) => {
//     const res = await instance.methods.addManufacturer(name,pinc).send({from: accounts[1],gas : 1000000});
//     console.log(res);
// }
// updatingManufacturer = async(name,pinc) => {
//     const res = await instance.methods.updateManufacturer(name,pinc).send({from: accounts[1],gas : 1000000});
//     console.log(res);
// }

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
