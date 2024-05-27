import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import Image from "next/image";
import sol from "../assets/img/sol.png";

function BuyNow() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [recipientAddress, setRecipientAddress] = useState(
    "48WkwuZq6LkWAkesTmu8PtVLb8v2Sfh3Yi8vkAPYyK9i"
  );
  const [amount, setAmount] = useState("");

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
          lamports: +amount * 1000000000, // converting SOL to lamports (9 decimal places)
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
    <>
      <div className="copytoclipboard1 container mt-4">
        <input
          type="text"
          id="copyTarget"
          placeholder="Ente
          r SOL Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button>
          <span>
            <Image className="copy0" src={sol} alt="sol" />
          </span>
        </button>
      </div>
      <br />
      <button onClick={handleTransfer} className="boxed-btn mt-0">
        Buy Now
      </button>
    </>
  );
}

export default BuyNow;
