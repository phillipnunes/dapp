// Contract deployed using REMIX IDE
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("BitsoToken", "BTK") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
}
