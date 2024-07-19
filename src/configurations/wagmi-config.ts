import { http, createConfig } from 'wagmi'
import { arbitrumSepolia, avalancheFuji, bscTestnet, polygonAmoy, sepolia } from 'wagmi/chains'
import { injected, safe, walletConnect } from 'wagmi/connectors'
import dotenv from "dotenv"

dotenv.config()

export const config = createConfig({
    chains: [arbitrumSepolia, avalancheFuji, bscTestnet, polygonAmoy, sepolia],
    transports: {
        [arbitrumSepolia.id]: http(),
        [avalancheFuji.id]: http(),
        [bscTestnet.id]: http(),
        [polygonAmoy.id]: http(),
        [sepolia.id]: http()
    },
    connectors: [
        injected(),
        walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string }),
        safe()
    ]
})