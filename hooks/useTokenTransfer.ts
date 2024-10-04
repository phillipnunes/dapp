import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import {TOKEN_ABI} from "@/config/tokenAbi";
import {Hash} from "viem";

export function useTokenTransfer(tokenAddress: Hash, decimals: number) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string | null>(null)

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
      const amountInWei = ethers.parseUnits(amount, decimals)
      transfer({
        address: tokenAddress,
        abi: TOKEN_ABI,
        functionName: 'transfer',
        args: [recipient, amountInWei]
      })
    } catch (err) {
      console.log(err)
      setError('Invalid amount')
    }
  }

  useEffect(() => {
    if (isTransferComplete) {
      setRecipient('')
      setAmount('')
    }
  }, [isTransferComplete])

  return {
    recipient,
    setRecipient,
    amount,
    setAmount,
    error,
    isTransferPending,
    isTransferMining,
    isTransferComplete,
    handleTransfer,
  }
}
