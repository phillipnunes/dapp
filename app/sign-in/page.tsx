'use client'

import { useAccount, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login with Wallet</CardTitle>
          <CardDescription>Connect your wallet to login</CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <Button onClick={openConnectModal} className="w-full">
                  Connect Wallet
                </Button>
              )}
            </ConnectButton.Custom>
          ) : (
            <div className="text-center">
              <p className="mb-2">Connected with address:</p>
              <p className="font-mono text-sm break-all">{address}</p>
              <Button onClick={() => disconnect()} className="mt-4 w-full">
                Disconnect
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
