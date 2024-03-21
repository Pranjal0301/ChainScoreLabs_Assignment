import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


//Import RainbowKit, Wagmi and TanStack Query. As guided in the documentation

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora, } from 'wagmi/chains';
import { QueryClientProvider, QueryClient,} from "@tanstack/react-query";

//config set for chains and no SSR incase of NEXT.js migration ssr:true;
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: false,
});

//query client for tanstack
const queryClient = new QueryClient();
// console.log(queryClient)
//wrapping app around rainbowkit, queryclient/tanstack, wagmi

//User Walllet address
// console.log(window.ethereum) // metamask api for user address
// console.log(window.ethereum.request({ method: 'eth_requestAccounts' })) // array as an op
// const address  = await window.ethereum.request({ method: 'eth_requestAccounts' })
// console.log(address[0])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)
