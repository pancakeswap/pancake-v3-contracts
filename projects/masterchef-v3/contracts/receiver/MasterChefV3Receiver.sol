// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../interfaces/IMasterChefV3.sol";
import "../interfaces/IMasterChefV2.sol";

contract MasterChefV3Receiver is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable Cake;
    IMasterChefV2 public immutable MasterChefV2;
    uint256 public immutable V2_Pid;
    IMasterChefV3 public immutable MasterChefV3;

    address public operatorAddress;

    error NotOwnerOrOperator();
    error ZeroAddress();
    error NoBalance();

    event Deposit(address indexed from, address indexed to, uint256 amount, uint256 pid);
    event NewOperator(address indexed operatorAddress);
    event Upkeep(address indexed to, uint256 amount, bool withUpdate);
    event Withdraw(address indexed token, address indexed to, uint256 amount);

    modifier onlyOwnerOrOperator() {
        if (msg.sender != operatorAddress && msg.sender != owner()) revert NotOwnerOrOperator();
        _;
    }

    /// @notice Constructor.
    /// @param _v2 MasterChef V2 address.
    /// @param _v3 MasterChef V3 address.
    /// @param _cake Cake token address.
    /// @param _v2Pid The pool id of the dummy pool on the MCV2.
    constructor(IMasterChefV2 _v2, IMasterChefV3 _v3, IERC20 _cake, uint256 _v2Pid) {
        MasterChefV2 = _v2;
        MasterChefV3 = _v3;
        Cake = _cake;
        V2_Pid = _v2Pid;

        Cake.safeApprove(address(_v3), type(uint256).max);
    }

    /// @notice Deposits a dummy token to `MASTER_CHEF` MCV2. It will transfer all the `dummyToken` in the tx sender address.
    /// @dev Callable by owner.
    /// @param _dummyToken The address of the token to be deposited into MCV2.
    function depositForMasterChefV2Pool(IERC20 _dummyToken) external onlyOwner {
        uint256 balance = _dummyToken.balanceOf(msg.sender);
        if (balance == 0) revert NoBalance();
        _dummyToken.safeTransferFrom(msg.sender, address(this), balance);
        _dummyToken.approve(address(MasterChefV2), balance);
        MasterChefV2.deposit(V2_Pid, balance);
        emit Deposit(msg.sender, address(MasterChefV2), balance, V2_Pid);
    }

    /// @notice Harvest pending CAKE tokens from MasterChef V2.
    function harvestFromV2() internal {
        MasterChefV2.withdraw(V2_Pid, 0);
    }

    /// @notice upkeep.
    /// @dev Callable by owner or operator.
    /// @param _amount Injection amount, the injection amount can be flexibly controlled.
    /// @param _duration The period duration.
    /// @param _withUpdate Whether call "massUpdatePools" operation.
    function upkeep(uint256 _amount, uint256 _duration, bool _withUpdate) external onlyOwnerOrOperator {
        harvestFromV2();
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
