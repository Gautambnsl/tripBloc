import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SearchContextProvider } from './context/SearchContext';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';

const projectId = 'a6c1b0f365aaef1f0617e77730208a3e';

const metadata = {
  name: 'TripBloc',
  description: 'TripBloc description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

const goril = {
  chainId: 5,
  name: 'goriel',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

const chiliz = {
  chainId: 88882,
  name: 'chiliz spicy testnet',
  currency: 'CHZ',
  explorerUrl: 'https://spicy-explorer.chiliz.com/',
  rpcUrl: 'https://chiliz-spicy.publicnode.com',
};

const polygon = {
  chainId: 1442,
  name: 'Polygon zkEVM Testnet',
  currency: 'ETH',
  explorerUrl: '',
  rpcUrl: 'https://rpc.public.zkevm-test.net',
};

const scroll = {
  chainId: 534351,
  name: 'Scroll Sepolia Testnet',
  currency: 'ETH',
  explorerUrl: '',
  rpcUrl: 'https://sepolia-rpc.scroll.io',
};

const arbitrum = {
  chainId: 421614,
  name: 'Arbitrum Sepolia',
  currency: 'ETH',
  explorerUrl: '',
  rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
};

const base = {
  chainId: 84532,
  name: 'Base Goerli Testnet',
  currency: 'ETH',
  explorerUrl: '',
  rpcUrl: 'https://goerli.base.org',
};

const celo = {
  chainId: 44787,
  name: 'Celo Alfajores Testnet',
  currency: 'CELO',
  explorerUrl: '',
  rpcUrl: 'https://alfajores-forno.celo-testnet.org',
};

const mantle = {
  chainId: 5001,
  name: 'Mantle Testnet',
  currency: 'MNT',
  explorerUrl: '',
  rpcUrl: 'https://rpc.testnet.mantle.xyz',
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [polygon, scroll,arbitrum,chiliz,base,celo,mantle], //near, cartesi
  projectId,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </>
);
