// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IMasterChefV3.sol";
import "../interfaces/IMasterChefV2.sol";
import "../interfaces/IReceiver.sol";

/**
 * @dev MasterChefV3KeeperV1 was designed to use in BNB chain.
 * Receiver will harvest cake from MasterChefV2 pool , then upkeep for MasterChefV3.
 */
contract MasterChefV3KeeperV1 is KeeperCompatibleInterface, Ownable, Pausable {
    IMasterChefV2 public immutable MasterChefV2;
    IMasterChefV3 public immutable MasterChefV3;
    IReceiver public immutable Receiver;
    IERC20 public immutable Cake;

    uint256 public immutable V2Pid;
    address public register;

    // The next period duration for MasterChef V3.
    uint256 public PERIOD_DURATION = 1 days;

    uint256 public constant MAX_DURATION = 30 days;
    uint256 public constant MIN_DURATION = 1 days;

    // The buffer time for executing the next period in advance.
    uint256 public bufferSecond = 12 hours;
    // Avoid re-execution caused by duplicate transactions.
    uint256 public upkeepBufferSecond = 12 hours;

    error InvalidPeriodDuration();

    event NewRegister(address indexed register);
    event NewBufferSecond(uint256 bufferSecond);
    event NewUpkeepBufferSecond(uint256 upkeepBufferSecond);
    event NewPeriodDuration(uint256 periodDuration);

    /// @notice constructor.
    /// @param _V2 MasterChefV2 address.
    /// @param _V3 MasterChefV3 address.
    /// @param _receiver Receiver address.
    /// @param _cake Cake address.
    /// @param _V2Pid Pid in MasterChefV2.
    constructor(IMasterChefV2 _V2, IMasterChefV3 _V3, IReceiver _receiver, IERC20 _cake, uint256 _V2Pid) {
        MasterChefV2 = _V2;
        MasterChefV3 = _V3;
        Receiver = _receiver;
        Cake = _cake;
        V2Pid = _V2Pid;
    }

    modifier onlyRegister() {
        require(msg.sender == register, "Not register");
        _;
    }

    //The logic is consistent with the following performUpkeep function, in order to make the code logic clearer.
    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory) {
        if (!paused()) {
            uint256 penddingCakeAmount = MasterChefV2.pendingCake(V2Pid, address(Receiver));
            uint256 cakeBalanceInReceiver = Cake.balanceOf(address(Receiver));
            uint256 latestPeriodEndTime = MasterChefV3.latestPeriodEndTime();
            if (penddingCakeAmount + cakeBalanceInReceiver > 0 && latestPeriodEndTime < block.timestamp + bufferSecond)
                upkeepNeeded = true;
        }
    }

    function performUpkeep(bytes calldata) external override onlyRegister whenNotPaused {
        uint256 latestPeriodStartTime = MasterChefV3.latestPeriodStartTime();
        if (latestPeriodStartTime + upkeepBufferSecond < block.timestamp) Receiver.upkeep(0, PERIOD_DURATION, true);
    }

    /// @notice Set register.
    /// @dev Callable by owner
    /// @param _register New register.
    function setRegister(address _register) external onlyOwner {
        require(_register != address(0), "Can not be zero address");
        register = _register;
        emit NewRegister(_register);
    }

    /// @notice Set bufferSecond.
    /// @dev Callable by owner
    /// @param _bufferSecond New bufferSecond.
    function setBufferSecond(uint256 _bufferSecond) external onlyOwner {
        bufferSecond = _bufferSecond;
        emit NewBufferSecond(_bufferSecond);
    }

    /// @notice Set upkeep BufferSecond.
    /// @dev Callable by owner
    /// @param _upkeepBufferSecond New upkeep BufferSecond.
    function setUpkeepBufferSecond(uint256 _upkeepBufferSecond) external onlyOwner {
        upkeepBufferSecond = _upkeepBufferSecond;
        emit NewUpkeepBufferSecond(_upkeepBufferSecond);
    }

    /// @notice Set period duration.
    /// @dev Callable by owner
    /// @param _periodDuration New period duration.
    function setPeriodDuration(uint256 _periodDuration) external onlyOwner {
        if (_periodDuration < MIN_DURATION || _periodDuration > MAX_DURATION) revert InvalidPeriodDuration();
        PERIOD_DURATION = _periodDuration;
        emit NewPeriodDuration(_periodDuration);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
