import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia
} from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Bitso Dapp',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains: [sepolia],
  ssr: true,
});

export { config };
