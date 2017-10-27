pragma solidity ^0.4.15;

import './interfaces/ERC20Interface.sol';

import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';

/**
 * @title Token
 * @dev Contract that implements ERC20 token standard
 * Is deployed by `Crowdsale.sol`, keeps track of balances, etc.
 */

contract Token is ERC20Interface {
	string public name = "Zeus";
	string public symbol = "Zeus";
	uint8 public demical = 18;

	// uint256 public totalSupply = 36000;

	// bool saleEnded;

	// address public minter;
	// mapping (address => uint) public balances;

	// event Purchase(address from, address to, unint amount);
	// event Refund(address from, address to, uint amount);

	// function Coin() {
	// 	minter = msg.sender;
	// }

	// function mint(address receive, uint amount) {
	// 	if (msg.sender != minter ) return;
	// 	balances[receiver] += amount;
	// }

	// function send(address receiver, uint amount) {
	// 	if (balances[msg.sender] < amount) return ;
	// 	balances[msg.sender] -= amount;
	// 	balances[receiver] += amount;
	// 	Purchase(msg.sender, receiver, amount);
	// }

}