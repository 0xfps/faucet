"use client"

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from "./_app";
import { config } from "@/configurations/wagmi-config";
import Modal from "./components/modals";

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App>
          <Modal />
          {children}
        </App>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
