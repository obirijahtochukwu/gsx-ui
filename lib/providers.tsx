import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import * as chains from "wagmi/chains";

import {  getDefaultConfig } from "connectkit";
import { QueryClient } from "@tanstack/react-query";

const transports: any = {};
Object.values(chains).forEach((chain) => (transports[chain.id] = http()));

export const config: any = createConfig(
  getDefaultConfig({
    appName: "Catoshi Bridge",
    chains: [mainnet, ...Object.values(chains)],
    transports,
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
    ssr: true,
  })
);
