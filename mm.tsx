import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

function SolanaTransfer() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const handleTransfer = async () => {
    try {
      if (!publicKey) {
        console.error("Wallet not connected.");
        return;
      }

      // Convert recipient's address to a PublicKey object
      const recipientPublicKey = new PublicKey(recipientAddress);

      // Create a new transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPublicKey,
          lamports: amount * 1000000000, // converting SOL to lamports (9 decimal places)
        })
      );

      // Sign and send the transaction
      const signature = await sendTransaction(transaction, connection);

      console.log("Transaction sent with signature:", signature);
    } catch (error) {
      console.error("Error sending SOL:", error);
    }
  };

  return (
    <div>
      <h2>Solana Transfer</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
      <button
        type="button"
        onClick={handleTransfer}
        className="text-white ml-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Blue
      </button>
      {/* 48WkwuZq6LkWAkesTmu8PtVLb8v2Sfh3Yi8vkAPYyK9i */}
    </div>
  );
}

export default SolanaTransfer;
