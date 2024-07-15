import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import chains from "wagmi/chains";

import { getDefaultConfig } from "connectkit";

const transports: any = {};
Object.values(chains).forEach((chain) => (transports[chain.id] = http()));
const _chains: any = [mainnet, ...Object.values(chains)];
export const config: any = createConfig(
  getDefaultConfig({
    appName: "Catoshi Bridge",
    chains: _chains,
    transports,
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
    ssr: true,
  })
);
