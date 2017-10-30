var Crowdsale = artifacts.require("./Crowdsale.sol");
var Queue = artifacts.require("./Queue.sol");
var Token = artifacts.require("./Token.sol");

module.exports = function(deployer, network, accounts) {
  return liveDeploy(deployer);
};

async function liveDeploy(deployer){
  crowdSaleInfo(web3.eth.accounts[0]);
  return deployer.deploy(Crowdsale, totalSupply, startTime, endTime, rate, owner, maxTime).then(async () => {
    const instance = await Crowdsale.deployed();
    const token = await instance.token.call();
    console.log('Token Address', token);
  });
}

function crowdSaleInfo(owner_account){
  const owner = owner_account;
  const totalSupply = 48000;
  const maxTime = 10;
  const startTime = latestTime() + duration.weeks(1);
  const endTime =   startTime + duration.weeks(1);
  const rate = new BigNumber(10);
}

function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}