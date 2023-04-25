// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721
{
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    string public baseTokenURI;
    event mintevent(address addOfSender, uint256 id);
    
    constructor() ERC721("NFTTutorial", "NFT") {}
    
    function mintTo(address recipient) public
    {
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        emit mintevent(msg.sender,newItemId);
    }

    function _baseURI() internal view virtual override returns (string memory) 
    {
        return baseTokenURI;
    }

    function setBaseTokenURI(string memory _baseTokenURI) public 
    {
        baseTokenURI = _baseTokenURI;
    }
}