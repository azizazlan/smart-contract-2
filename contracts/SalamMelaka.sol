// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SalamMelaka is Ownable {
    string public name;

    event NameChanged(string value);

    constructor(string memory _name) {
        name = _name;
    }

    function salam() public view returns (string memory) {
        return string(abi.encodePacked("Assalamualaikum, ", name, "!"));
    }

    function changeName(string memory _name) public onlyOwner {
        name = _name;
        emit NameChanged(_name);
    }
}
