
## Demo URL: https://dapp-six-dusky.vercel.app

# ERC-20 Token Dapp

This is a decentralized application (dApp) built using [Next.js](https://nextjs.org) that allows users to connect their wallet, view their ERC-20 token balance, and transfer tokens to other addresses on an Ethereum testnet. The app is deployed on Sepolia testnet, but it can work with other testnets.

## Features

- **Wallet Connection**: Users can connect and disconnect their Ethereum wallet using libraries like `wagmi` and `RainbowKit`.
- **ERC-20 Token Balance**: Once connected, users can view their token balance in real time.
- **Token Transfers**: Users can send tokens to any Ethereum address with accurate gas fee estimation.
- **Error Handling**: The app provides appropriate feedback for errors like transaction failures, connection issues, or insufficient balance.
- **Clean Code**: Follows best practices for clean, maintainable code.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [MetaMask](https://metamask.io/) or any other Ethereum-compatible wallet
- [Sepolia Testnet](https://sepolia.etherscan.io/) (for ERC-20 token deployment)

### Development

1. Clone the repository:

```bash
git clone https://github.com/your-repo/dapp.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app.

### Wallet Connection

- The app uses [wagmi](https://wagmi.sh/) and [RainbowKit](https://rainbowkit.com/) for seamless wallet connection.
- Upon connecting, users will be redirected to a dashboard where they can view their ERC-20 token balance.

### ERC-20 Token Deployment

- The ERC-20 token is deployed on Sepolia testnet.
- You can use [Ethers.js](https://docs.ethers.io/) for interacting with the deployed contract.
- To deploy your own token on Sepolia, follow the steps in the [OpenZeppelin documentation](https://docs.openzeppelin.com/contracts/4.x/erc20).

### Sending Transactions

- Users can send tokens to any Ethereum address.
- Gas fees are estimated using the `ethers.js` library to ensure the transaction is processed smoothly.

### Disconnecting the Wallet

- Users can disconnect their wallet, which will redirect them back to the login screen.

## Deployment

The app can be deployed using [Vercel](https://vercel.com). Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about the tools and technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [wagmi Documentation](https://wagmi.sh/docs)
- [RainbowKit Documentation](https://rainbowkit.com/docs)
- [Ethers.js Documentation](https://docs.ethers.io/)

## License

This project is licensed under the MIT License.
