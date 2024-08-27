import { http, createConfig } from 'wagmi'
import { arbitrumSepolia, baseSepolia, bscTestnet, scrollSepolia, sepolia } from 'wagmi/chains'
import { injected, safe, walletConnect } from 'wagmi/connectors'
import dotenv from "dotenv"

dotenv.config()

export const config = createConfig({
    chains: [arbitrumSepolia, baseSepolia, bscTestnet, scrollSepolia, sepolia],
    transports: {
        [arbitrumSepolia.id]: http(),
        [baseSepolia.id]: http(),
        [bscTestnet.id]: http(),
        [scrollSepolia.id]: http(),
        [sepolia.id]: http()
    },
    connectors: [
        injected(),
        walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
        safe()
    ]
})