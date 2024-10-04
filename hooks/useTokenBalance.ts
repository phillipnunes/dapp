import { useBalance, useReadContract } from 'wagmi'
import { TOKEN_ABI } from "@/config/tokenAbi";
import {Hash} from "viem";

export function useTokenBalance(address: Hash | undefined, tokenAddress: Hash) {
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    token: tokenAddress,
  })

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: TOKEN_ABI,
    functionName: 'decimals',
  })

  const { data: dataSymbol } = useReadContract({
    address: tokenAddress,
    abi: TOKEN_ABI,
    functionName: 'symbol',
  })

  return {
    balance,
    decimals: decimals as number,
    symbol: dataSymbol as string,
    isBalanceLoading,
  }
}
