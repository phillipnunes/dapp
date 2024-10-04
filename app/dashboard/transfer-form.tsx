import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle  } from "@/components/ui/alert"
import { InputField } from "@/components/ui/input-field"


type TransferFormProps = {
  recipient: string;
  amount: string;
  setRecipient: (value: string) => void;
  setAmount: (value: string) => void;
  handleTransfer: () => void;
  isTransferPending: boolean;
  isTransferMining: boolean;
  error: string | null;
  isTransferComplete: boolean;
};

const TransferForm = ({
  recipient,
  amount,
  setRecipient,
  setAmount,
  handleTransfer,
  isTransferPending,
  isTransferMining,
  error,
  isTransferComplete
}: TransferFormProps) => {
  return (
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
  );
};

export { TransferForm }
