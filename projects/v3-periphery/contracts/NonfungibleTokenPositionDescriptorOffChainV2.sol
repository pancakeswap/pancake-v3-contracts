// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import '@openzeppelin/contracts-upgradeable/proxy/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol';

import './interfaces/INonfungibleTokenPositionDescriptor.sol';

/// @title Describes NFT token positions
contract NonfungibleTokenPositionDescriptorOffChainV2 is INonfungibleTokenPositionDescriptor, Initializable {
    using StringsUpgradeable for uint256;

    string private _baseTokenURI;

    /**
     * @dev Indicates that the contract has been initialized.
     */
    bool private _initializedV2;

    /**
     * @dev Modifier to protect an initializer function from being invoked twice.
     */
    modifier initializerV2() {
        require(!_initializedV2, "Already initialized V2");

        _initializedV2 = true;

        _;
    }

    function initialize(string calldata baseTokenURI) external initializer {
        _baseTokenURI = baseTokenURI;
    }

    function initializeV2(string calldata baseTokenURI) external initializerV2 {
        _baseTokenURI = baseTokenURI;
    }

    /// @inheritdoc INonfungibleTokenPositionDescriptor
    function tokenURI(INonfungiblePositionManager positionManager, uint256 tokenId)
        external
        view
        override
        returns (string memory)
    {
        return bytes(_baseTokenURI).length > 0 ? string(abi.encodePacked(_baseTokenURI, tokenId.toString())) : "";
    }
}
