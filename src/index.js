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
	name: "Ethereum",
	currency: "ETH",
	explorerUrl: "https://etherscan.io",
	rpcUrl: "https://cloudflare-eth.com",
};

const goril = {
	chainId: 5,
	name: "goriel",
	currency: "ETH",
	explorerUrl: "https://etherscan.io",
	rpcUrl: "https://cloudflare-eth.com",
};
const chiliz = {
	chainId: 88882,
	name: "chiliz spicy testnet",
	currency: "CHZ",
	explorerUrl: "https://spicy-explorer.chiliz.com/",
	rpcUrl: "https://chiliz-spicy.publicnode.com",
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [
    mainnet,
    goril,
    chiliz
  ],
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
