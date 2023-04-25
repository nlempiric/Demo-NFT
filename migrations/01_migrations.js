const NFT=artifacts.require('NFT');

module.exports=function(deployer)
{
    deployer.deploy(NFT);
};

// 0x4dBbc26A7Dd33948A69Ad862FBF9Eaa6Cf0eCCBE