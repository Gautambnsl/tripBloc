import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SearchContextProvider } from './context/SearchContext';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import {
  arbitrum,
  base,
  celo,
  filecoin,
  mantle,
  neonMainnet,
  polygon,
  scroll,
  zkSync,
} from 'viem/chains';

const chains = [
  zkSync,
  polygon,
  filecoin,
  scroll,
  arbitrum,
  base,
  celo,
  mantle,
  neonMainnet
];

// chiliz, aztec, near, cartesi
const projectId = 'a6c1b0f365aaef1f0617e77730208a3e';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <AuthContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthContextProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  </>
);
