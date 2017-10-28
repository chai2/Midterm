pragma solidity ^0.4.15;

import './Queue.sol';
import './Token.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

/**
 * @title Crowdsale
 * @dev Contract that deploys `Token.sol`
 * Is timelocked, manages buyer queue, updates balances on `Token.sol`
 */

contract Crowdsale {
	// YOUR CODE HERE
    uint256 public startTime;
    uint256 public endTime;

    uint256 public tokenCount;

    address owner;
}
