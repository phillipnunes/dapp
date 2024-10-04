import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle  } from "@/components/ui/alert"
import { InputField } from "@/components/ui/input-field"
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
              <InputField
                label="Recipient Address"
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
              />
              <InputField
                label="Amount"
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
              />
              <Button
                onClick={handleTransfer}
                disabled={isTransferPending || isTransferMining}
                className="w-full"
              >
                {isTransferPending || isTransferMining ? (
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
