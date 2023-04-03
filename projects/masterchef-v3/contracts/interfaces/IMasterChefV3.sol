// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IMasterChefV3 {
    function latestPeriodEndTime() external view returns (uint256);

    function latestPeriodStartTime() external view returns (uint256);

    function upkeep(uint256 amount, uint256 duration, bool withUpdate) external;
}
