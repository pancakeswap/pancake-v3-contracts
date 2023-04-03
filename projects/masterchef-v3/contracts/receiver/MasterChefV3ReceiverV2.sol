// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../interfaces/IMasterChefV3.sol";

contract MasterChefV3ReceiverV2 is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable Cake;
    IMasterChefV3 public immutable MasterChefV3;

    address public operatorAddress;

    error NotOwnerOrOperator();
    error ZeroAddress();
    error NoBalance();

    event NewOperator(address indexed operatorAddress);
    event Upkeep(address indexed to, uint256 amount, bool withUpdate);
    event Withdraw(address indexed token, address indexed to, uint256 amount);

    modifier onlyOwnerOrOperator() {
        if (msg.sender != operatorAddress && msg.sender != owner()) revert NotOwnerOrOperator();
        _;
    }

    /// @notice Constructor.
    /// @param _v3 MasterChef V3 address.
    /// @param _cake Cake token address.
    constructor(IMasterChefV3 _v3, IERC20 _cake) {
        MasterChefV3 = _v3;
        Cake = _cake;

        Cake.safeApprove(address(_v3), type(uint256).max);
    }

    /// @notice upkeep.
    /// @dev Callable by owner or operator.
    /// @param _amount Injection amount, the injection amount can be flexibly controlled.
    /// @param _duration The period duration.
    /// @param _withUpdate Whether call "massUpdatePools" operation.
    function upkeep(uint256 _amount, uint256 _duration, bool _withUpdate) external onlyOwnerOrOperator {
        uint256 amount = _amount;
        uint256 balance = Cake.balanceOf(address(this));
        if (_amount == 0 || _amount > balance) {
            amount = balance;
        }
        MasterChefV3.upkeep(amount, _duration, _withUpdate);
        emit Upkeep(address(MasterChefV3), amount, _withUpdate);
    }

    /// @notice Set operator address.
    /// @dev Callable by owner.
    /// @param _operatorAddress New operator address.
    function setOperator(address _operatorAddress) external onlyOwner {
        if (_operatorAddress == address(0)) revert ZeroAddress();
        operatorAddress = _operatorAddress;
        emit NewOperator(_operatorAddress);
    }

    /// @notice Withdraw unexpected tokens sent to the receiver, can also withdraw cake.
    /// @dev Callable by owner.
    /// @param _token Token address.
    function withdraw(IERC20 _token) external onlyOwner {
        uint256 amount = _token.balanceOf(address(this));
        _token.safeTransfer(msg.sender, amount);
        emit Withdraw(address(_token), msg.sender, amount);
    }
}
