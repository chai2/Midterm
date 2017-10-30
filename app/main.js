// Import the page's CSS. Webpack will know what to do with it.
import "./app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

import crowdsale_artifacts from '../build/contracts/Crowdsale.json';

var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var contract = require("truffle-contract");

var Crowdsale = contract(crowdsale_artifacts);

let tokenPrice = web3.toWei('0.1', 'ether');

/* The user enters the total no. of tokens to buy. We calculate the total cost and send it in
 * the request. We have to send the value in Wei. So, we use the toWei helper method to convert
 * from Ether to Wei.
 */

window.buyTokens = function() {
  let fromAddress = $("fromAddress").val();
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait");
  Crowdsale.deployed().then(function(contractInstance) {
    contractInstance.buyTokens({value: web3.toWei(price, 'ether'), from: fromAddress}).then(function(v) {
      $("#buy-msg").html("");
      web3.eth.getBalance(contractInstance.token.balanceOf(fromAddress), function(error, result) {
        $("#contract-balance").html(web3.fromWei(result.toString()) + " Ether");
      });
    })
  });
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Crowdsale.setProvider(web3.currentProvider);

});
