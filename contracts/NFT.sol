// // SPDX-License-Identifier: GPL-3.0
// pragma solidity >=0.4.16 <0.9.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract NFT is ERC721
// {
//     using Counters for Counters.Counter;
//     Counters.Counter private currentTokenId;
//     string public baseTokenURI;
//     event mintevent(address addOfSender, uint256 id);
    
//     constructor() ERC721("NFTTutorial", "NFT") {}
    
//     function mintTo(address recipient) public
//     {
//         currentTokenId.increment();
//         uint256 newItemId = currentTokenId.current();
//         _safeMint(recipient, newItemId);
//         emit mintevent(msg.sender,newItemId);
//     }

//     function _baseURI() internal view virtual override returns (string memory) 
//     {
//         return baseTokenURI;
//     }

//     function setBaseTokenURI(string memory _baseTokenURI) public 
//     {
//         baseTokenURI = _baseTokenURI;
//     }
// }


pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721, ERC721Enumerable {
    constructor() ERC721("MyToken", "MTK") {}


    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    string public baseTokenURI;
    event mintevent(address addOfSender, uint256 id);


    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    
    function mintTo(address recipient) public returns (uint256)
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

    function get() public view returns(string memory) {
        return _baseURI();
    }


    function setBaseTokenURI(string memory _baseTokenURI) public 
    {
        baseTokenURI = _baseTokenURI;
    }

}