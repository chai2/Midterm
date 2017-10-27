pragma solidity ^0.4.15;

// import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import './Queue.sol';
import './Token.sol';

import '../utils/Math.sol';
import '../utils/SafeMath.sol';

/**
 * @title Crowdsale
 * @dev Contract that deploys `Token.sol`
 * Is timelocked, manages buyer queue, updates balances on `Token.sol`
 */

contract ZeusCrowdsale{

	using SafeMath for uint256;
	MintableToken public token;

	uint256 public _startTime;
	uint256 public _endTime;
	address public _wallet;
	uint256 public rate;
	uint256 public weiRaised;
	bool public saleEnded;

	event Purchase(address from, address to, uint amount);
	event Refund(address from, address to, uint amount);

	address public owner;

	function ZeusCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet)     {
	    require(_startTime >= now);
	    require(_endTime >= _startTime);
	    require(_rate > 0);
	    require(_wallet != address(0));

		owner = msg.sender;
	    
	    token = createTokenContract();
	    startTime = _startTime;
	    endTime = _endTime;
	    rate = _rate;
	    wallet = _wallet;
	}

	function createTokenContract() {
    	return new Token();
  	}

  	function () payable {
    	buyTokens(msg.sender);
  	}

  	function buyTokens(address buyer) public payable {
  		if (!hasEnded()) return;
	    require(buyer != address(0));
	    require(validPurchase());

	    uint256 weiAmount = msg.value;
	    uint256 tokens = weiAmount.mul(rate);

	    weiRaised = weiRaised.add(weiAmount);

	    token.mint(buyer, tokens);
	    TokenPurchase(msg.sender, buyer, weiAmount, tokens);
	    forwardFunds();
	  }

  function forwardFunds() internal {
    wallet.transfer(msg.value);
  }

  function validPurchase() internal constant returns (bool) {
    bool withinPeriod = now >= startTime && now <= endTime;
    bool nonZeroPurchase = msg.value != 0;
    return withinPeriod && nonZeroPurchase;
  }

  function hasEnded() public constant returns (bool) {
    return now > endTime;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

}
