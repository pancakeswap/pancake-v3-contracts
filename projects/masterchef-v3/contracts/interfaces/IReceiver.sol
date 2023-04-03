// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IReceiver {
    function upkeep(uint256 amount, uint256 duration, bool withUpdate) external;
}
