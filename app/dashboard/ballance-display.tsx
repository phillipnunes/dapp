import {Loader2} from "lucide-react";
import {Button} from '@/components/ui/button';
import {useDisconnect} from "wagmi";

type BalanceDisplayProps = {
  balance: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint
  } | undefined;
  symbol: string;
  isLoading: boolean;
}

const BalanceDisplay = ({ balance, symbol, isLoading }: BalanceDisplayProps) => {
  const { disconnect } = useDisconnect()

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-medium">Your Balance</h3>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <p className="text-2xl font-bold">{balance?.formatted} {symbol}</p>
        )}
      </div>
      <Button onClick={() => disconnect()} variant="outline">
        Disconnect
      </Button>
    </div>
  );
};

export { BalanceDisplay }
