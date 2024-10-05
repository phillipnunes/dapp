'use client'

import { useAccount } from 'wagmi'
import { BalanceDisplay } from './ballance-display'
import { DashboardLayout } from './dashboard-layout'
import { TransferForm } from './transfer-form'
import { useTokenTransfer } from "@/hooks/useTokenTransfer"
import { useTokenBalance } from "@/hooks/useTokenBalance"
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {TOKEN_ADDRESS} from "@/constants";

export default function Dashboard() {
  const router = useRouter()
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

  useEffect(() => {
    if(!isConnected) {
      router.push('sign-in')
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null
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
