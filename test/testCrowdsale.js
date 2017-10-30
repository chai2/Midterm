'use strict';

/* Add the dependencies you're testing */
var Crowdsale = artifacts.require("./Crowdsale.sol");
// YOUR CODE HERE

contract('testCrowdsale', function(accounts) {
	/* Define your constant variables and instantiate constantly changing 
	 * ones
	 */
	let owner = web3.eth.accounts[0];
	let buyer = web3.eth.accounts[1];
	let totalSupply = 24000;
	let maxTime = 10;
	let startTime = latestTime();
	let endTime =   startTime + 50000;
	let rate = web3.toWei('0.1', 'ether');

	/* Do something before every `describe` method */
	beforeEach(async function() {
		// YOUR CODE HERE
	});

	/* Group test cases together 
	 * Make sure to provide descriptive strings for method arguements and
	 * assert statements
	 */
	describe('Verify Crowdsale functions', function(){
		it("should put 10000 BAB Tokens in the first account", function() {
		    return Crowdsale.deployed().then(function(instance) {
		      return instance.token.balanceOf.call(owner);
		    }).then(function(balance) {
		      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
		    });
		});
		it("buyer should have ability to purchase tokens", function(){
			let msg.value = "10";
			return Crowdsale.deployed().then(function(instance){
				return instance.buyTokens.call(buyer);
			}).then(function(response){ // Hoping the response will be a success transaction id
				assert.equal(response.valueOf(), msg.value, "Buyer should have BAB token balance")
			});
		});
	});
});
