var Crowdsale = artifacts.require("./Crowdsale.sol");
var Queue = artifacts.require("./Queue.sol");
var Token = artifacts.require("./Token.sol");

module.exports = function(deployer) {
  return liveDeploy(deployer);
};

async function liveDeploy(deployer){
  const owner = web3.eth.accounts[0];
  const totalSupply = 48000;
  const maxTime = 10;
  const startTime = latestTime();
  const endTime =   startTime + 50000;
  const rate = web3.toWei('0.1', 'ether');

  return deployer.deploy(Crowdsale, 48000, startTime, endTime, rate, owner, maxTime).then(async () => {
    const instance = await Crowdsale.deployed();
    const token = await instance.token.call();
    console.log('Token Address', token);
  });
}

function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}