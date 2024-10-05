'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function SignInPage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if(isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login with Wallet</CardTitle>
          <CardDescription>Connect your wallet to login</CardDescription>
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
