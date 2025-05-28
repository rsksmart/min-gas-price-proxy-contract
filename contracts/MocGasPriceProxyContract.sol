// contracts/MocGasPriceProxyContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IMoCState {
    function getBitcoinPrice() external view returns (uint256);
}

contract MocGasPriceProxyContract {
    address public IMoCState_addr;

    /// @param _mocStateAddr the MoCState contract to call
    constructor(address _mocStateAddr) {
        require(_mocStateAddr != address(0), "Invalid MoCState address");
        IMoCState_addr = _mocStateAddr;
    }

    function getConvertedPrice() external view returns (uint256) {
        uint256 priceInWei = IMoCState(IMoCState_addr).getBitcoinPrice();
        return priceInWei / 10**18;
    }
}
