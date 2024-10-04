'use client'

import { useAccount } from 'wagmi'
import {WalletConnectPrompt} from './wallet-connect-prompt'
import { BalanceDisplay } from './ballance-display'
import { DashboardLayout } from './dashboard-layout'
import { TransferForm } from './transfer-form'
import { useTokenTransfer } from "@/hooks/useTokenTransfer"
import { useTokenBalance } from "@/hooks/useTokenBalance"
import {Hash} from "viem";

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Hash

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const { balance, decimals, symbol, isBalanceLoading } = useTokenBalance(address, TOKEN_ADDRESS)
  const {
    recipient,
    setRecipient,
    amount,
    setAmount,
    error,
    isTransferPending,
    isTransferMining,
    isTransferComplete,
    handleTransfer
  } = useTokenTransfer(TOKEN_ADDRESS, decimals)

  if (!isConnected) {
    return <WalletConnectPrompt />;
  }

  return (
    <DashboardLayout title="Token Dashboard" description="View your balance and transfer tokens">
      <div className="space-y-6">
        <BalanceDisplay balance={balance} symbol={symbol} isLoading={isBalanceLoading} />
        <TransferForm
          recipient={recipient}
          amount={amount}
          setRecipient={setRecipient}
          setAmount={setAmount}
          handleTransfer={handleTransfer}
          isTransferPending={isTransferPending}
          isTransferMining={isTransferMining}
          error={error}
          isTransferComplete={isTransferComplete}
        />
      </div>
    </DashboardLayout>
  );
}
