// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/utils/Context.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AshToken is Context, ERC20 {
    constructor() public ERC20("AshToken", "ASH") {
        _mint(_msgSender(), 10000 * (10**uint256(decimals())));
    }
}
