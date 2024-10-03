import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia
} from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Bitso Dapp',
  projectId: '9316b7963794299f5d704405bdf2e22c',
  chains: [sepolia],
  ssr: true,
});

export { config };
