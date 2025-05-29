// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract MockMoCState {
    uint256 private price;

    /// @notice lets tests set whatever “price” they like (in wei)
    function setPrice(uint256 _price) external {
        price = _price;
    }

    function getBitcoinPrice() external view returns (uint256) {
        return price;
    }
}
