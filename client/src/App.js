import logo from './logo.svg';
import './App.css';
import Mint from './Mint'; 
// import React, { useEffect } from 'react';
import React, { useEffect } from 'react';
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import abi from './NFT.json'
import { Chain } from 'wagmi';
import { ethers } from 'ethers';

const providers=new ethers.providers.Web3Provider(window.ethereum);
const signer=providers.getSigner();
const contractAddress="0x4dBbc26A7Dd33948A69Ad862FBF9Eaa6Cf0eCCBE";
const contractAbi = abi.abi;
const ncontract=new ethers.Contract(contractAddress,contractAbi,signer)


const sepolia: Chain = {
  id: 11155111,
  name: 'sepolia',
  network: 'Sepolia test network',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'sepolia',
    symbol: 'SepoliaETH',
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia.infura.io/v3/05173311a1ef4075b2ff048bbc62703f'],
    },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://sepolia.etherscan.io' },
    etherscan: { name: 'SnowTrace', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
};


const { chains, provider } = configureChains(
  [sepolia,chain.goerli,chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains
});




const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  // useAccount
});



function App() {
  return (
    <div className="App">
     <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Mint/>  
           
          </RainbowKitProvider>
      </WagmiConfig>
      
    </div>
  );
}

export default App;
export {ncontract};
