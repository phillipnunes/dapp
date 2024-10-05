'use client'

import { Loader2 } from "lucide-react"
import {formatUnits} from "viem";
import {config} from "@/config/wagmi";
import {useEffect, useState} from "react";
import { estimateFeesPerGas } from 'wagmi/actions';

const calculateFees = (gasPriceInWei: bigint, gasLimit: number) => {
  const feeInEth = parseFloat(formatUnits(gasPriceInWei, 18)) * gasLimit;
  return { eth: feeInEth.toFixed(6) };
};

const EstimateGasFee = () => {
  const [gasFee, setGasFee] = useState('');
  const [isEstimatingGas, setIsEstimatingGas] = useState(false);

  useEffect(() => {
    async function fetchEstimateGas() {
      try {
        setIsEstimatingGas(true)
        const feesPerGas = await estimateFeesPerGas(config, { chainId: 11155111 }); // Sepolia Chain ID
        const maxFeePerGas = BigInt(feesPerGas.maxFeePerGas);
        const gasFee = calculateFees(maxFeePerGas, 65000)
        setGasFee(gasFee.eth);
      } catch (e) {
        console.log(e)
      } finally {
        setIsEstimatingGas(false)
      }
    }

    fetchEstimateGas();
    const intervalId = setInterval(fetchEstimateGas, 10000); // Call it every 10 seconds (10000 ms)

    return () => clearInterval(intervalId);
  }, []);

  if (gasFee) {
    return <div className="text-sm text-gray-500">
      Estimated Gas Fee: {gasFee} SepoliaETH
    </div>
  }

  if (isEstimatingGas) {
    return <div className="text-sm text-gray-500 flex items-center">
      <Loader2 className="h-4 w-4 animate-spin mr-2"/>
      Estimating gas fee...
    </div>
  }
}

export {EstimateGasFee}
