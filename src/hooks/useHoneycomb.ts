import { useWallet as useSolanaWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import createEdgeClient from "@honeycomb-protocol/edge-client";
import { sendClientTransactions } from "@honeycomb-protocol/edge-client/client/walletHelpers";
import { toast } from 'sonner';


export function useHoneycomb() {
  const wallet = useSolanaWallet();
  const { connection } = useConnection();
  const client = createEdgeClient(import.meta.env.VITE_HONEYCOMB_EDGE_CLIENT_URL, true);

  const sendTransactionHelper = async (transactionResponse: any) => {
    const response = await sendClientTransactions(
        client,
        wallet,
        transactionResponse,
    );
    return response;
  };

  const createProject = async (projectName: string) => {
    if (!wallet.connected) {
      toast.error("Please connect your wallet first.");
      return;
    }

    const {
      createCreateProjectTransaction: {
        project: projectAddress, // This is the project address once it'll be created
        tx: txResponse, // This is the transaction response, you'll need to sign and send this transaction
      },
    } = await client.createCreateProjectTransaction({
      name: projectName,
      authority: wallet.publicKey?.toString() || "",
    });
    console.log("Project Address:", projectAddress);
    console.log("Transaction Response:", txResponse);

    const response = await sendTransactionHelper(txResponse);
    console.log("Transaction Response from Edge Client:", response);
    // Check if all responses have status 'success'
    // const allSucceeded = Array.isArray(response)
    //   ? response.every(bundle =>
    //       Array.isArray(bundle.responses) &&
    //       bundle.responses.every(r => r.status === 'success')
    //     )
    //   : false;

    // if (allSucceeded) {
    //   return projectAddress;
    // }
    return projectAddress;
  }

  return {
    createProject,
  };
}