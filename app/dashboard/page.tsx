'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import {type Hash} from "viem";
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {TOKEN_ABI} from "@/app/config/tokenAbi";

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Hash;

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    token: TOKEN_ADDRESS,
  })

  const { data: dataSymbol, isPending: isPendingSymbol } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: 'symbol',
  })
  const symbol = dataSymbol as string;

  const { data: decimals } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: 'decimals',
  })

  const { writeContract: transfer, data: transferData, isPending: isTransferPending } = useWriteContract()

  const { isLoading: isTransferMining, isSuccess: isTransferComplete } = useWaitForTransactionReceipt({
    hash: transferData,
  })

  const handleTransfer = () => {
    setError(null)
    if (!recipient || !amount) {
      setError('Please fill in both recipient address and amount')
      return
    }
    if (!ethers.isAddress(recipient)) {
      setError('Invalid recipient address')
      return
    }
    try {
      const amountInWei = ethers.parseUnits(amount, decimals as number)
      transfer({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'transfer',
        args: [recipient, amountInWei]
      })
    } catch (err) {
      console.log(err);
      setError('Invalid amount')
    }
  }

  useEffect(() => {
    if (isTransferComplete) {
      setRecipient('')
      setAmount('')
    }
  }, [isTransferComplete])

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>Please connect your wallet to view the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <Button onClick={openConnectModal} className="w-full">
                  Connect Wallet
                </Button>
              )}
            </ConnectButton.Custom>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Token Dashboard</CardTitle>
          <CardDescription>View your balance and transfer tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Your Balance</h3>
              {isBalanceLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <p className="text-2xl font-bold">{balance?.formatted} {symbol}</p>
              )}
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Transfer Tokens</h3>
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <Button
                onClick={handleTransfer}
                disabled={isTransferPending || isTransferMining || isPendingSymbol}
                className="w-full"
              >
                {isTransferPending || isTransferMining || isPendingSymbol? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isTransferMining ? 'Mining...' : 'Confirming...'}
                  </>
                ) : (
                  'Transfer'
                )}
              </Button>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {isTransferComplete && (
                <Alert>
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Transfer completed successfully!</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
