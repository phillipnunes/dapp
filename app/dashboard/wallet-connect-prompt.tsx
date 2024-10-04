import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConnectButton } from '@rainbow-me/rainbowkit'

const WalletConnectPrompt = () => {
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

export { WalletConnectPrompt };
