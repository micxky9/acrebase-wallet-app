import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [baseSepolia],

  connectors: [
    injected({
      target: "metaMask",
    }),

    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
      showQrModal: true,
    }),
  ],

  transports: {
    [baseSepolia.id]: http(),
  },

  ssr: true,
});