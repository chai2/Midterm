pragma solidity ^0.4.15;

import './interfaces/ERC20Interface.sol';

/**
 * @title Token
 * @dev Contract that implements ERC20 token standard
 * Is deployed by `Crowdsale.sol`, keeps track of balances, etc.
 */

contract Token is ERC20Interface {
	string public name = "Zeus";
	string public symbol = "Zeus";
	uint8 public demical = 18;
	uint256 public totalSupply = 48000;
	
	event Mint(address indexed to, uint256 amount);
	event Burn(address indexed burner, uint256 value);
	event MintFinished();

	bool public mintingFinished = false;

	modifier canMint() {
    	require(!mintingFinished);
    	_;
  	}

  	function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
	    if(_amount > totalSupply){
	    	finishMinting();
	    	return;
	    }
	    totalSupply = totalSupply.add(_amount);
	    balances[_to] = balances[_to].add(_amount);
	    Mint(_to, _amount);
	    Transfer(address(0), _to, _amount);
	    return true;
  	}

  	function finishMinting() onlyOwner public returns (bool) {
    	mintingFinished = true;
    	MintFinished();
    	return true;
  	}

  	function burn(uint256 _value) public {
        require(_value > 0);
        require(_value <= balances[msg.sender]);

        address burner = msg.sender;
        balances[burner] = balances[burner].sub(_value);
        totalSupply = totalSupply.sub(_value);
        Burn(burner, _value);
    }

	// bool saleEnded;

	// address public minter;
	// mapping (address => uint) public balances;

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