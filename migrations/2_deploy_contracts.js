var CryptoArt = artifacts.require("./CryptoArt.sol");
var percentageCut = 10;
var metaurl = 'http://geo.swapnil.art/'


module.exports = function(deployer) {
  deployer.deploy(CryptoArt,percentageCut,metaurl);
};
