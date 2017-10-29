// var ZeusCrowdsale = artifacts.require("./ZeusCrowdsale.sol");
// var Queue = artifacts.require("./Queue.sol");
// var Token = artifacts.require("./Token.sol");

// module.exports = function(deployer, network, accounts) {
// 	return liveDeploy(deployer, accounts);
// };

// async function liveDeploy(deployer, accounts) {
// 	const BigNumber = web3.BigNumber;
// 	const RATE = new BigNumber(10);
// 	const startTime = latestTime() + duration.weeks(1);
//     const endTime =   startTime + duration.weeks(1);
    
//     console.log([startTime, endTime, RATE.toNumber(), accounts[0]]);

// 	return deployer.deploy(ZeusCrowdsale, startTime, endTime, RATE, accounts[0]).then(async () => {
// 		const instance = await ZeusCrowdsale.deployed();
// 		const token = await instance.token.call();
// 		// console.log('Token address: ", token);
// 	})
//     // deployer.deploy(Queue);
//     // deployer.deploy(Token);
// }

// function latestTime() {
//   return web3.eth.getBlock('latest').timestamp;
// }

// // default function ether(n) {
// //   return new web3.BigNumber(web3.toWei(n, 'ether'));
// // }

// const duration = {
//   seconds: function(val) { return val},
//   minutes: function(val) { return val * this.seconds(60) },
//   hours:   function(val) { return val * this.minutes(60) },
//   days:    function(val) { return val * this.hours(24) },
//   weeks:   function(val) { return val * this.days(7) },
//   years:   function(val) { return val * this.days(365)}
// };

//    const instance = await ZeusCrowdsale.deployed();
//    const token = await instance.token.call();
//    // console.log('Token address: ", token);
//  })
//     // deployer.deploy(Queue);
//     // deployer.deploy(Token);
// }
  // deployer.deploy(Crowdsale);
  // deployer.deploy(Queue);
  // deployer.deploy(Token);

var Crowdsale = artifacts.require("./Crowdsale.sol");
var Queue = artifacts.require("./Queue.sol");
var Token = artifacts.require("./Token.sol");

module.exports = function(deployer, network, accounts) {
  return liveDeploy(deployer);
};

async function liveDeploy(deployer){
  crowdSaleInfo(web3.eth.accounts[0]);
  return deployer.deploy(Crowdsale, startTime, endTime, rate, owner, maxTime).then(async () => {
    const instance = await Crowdsale.deployed();
    // const token = await instance.token.call();
  }
}

function crowdSaleInfo(owner_account){
  const owner = owner_account;
  const totalSupply = web3.BigNumber;
  const maxTime = 10;
  const startTime = latestTime() + duration.weeks(1);
  const endTime =   startTime + duration.weeks(1);
  const rate = new BigNumber(10);
}

function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}