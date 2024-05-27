"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { shortenAddress } from "@/lib/utils";

//handle wallet balance fixed to 2 decimal numbers without rounding
export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

const WalletConnection = () => {
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();

  const [open, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info?.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [publicKey, connection]);

  useEffect(() => {
    setUserWalletAddress(publicKey?.toBase58()!);
  }, [publicKey]);

  const handleWalletSelect = async (walletName: any) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  const handleDisconnect = async () => {
    disconnect();
  };

  return (
    <>
      {!publicKey ? (
        <div className="header-right">
          <a onClick={() => setOpen(true)} href="#" className="boxed-btn mt-0">
            CONNECT WALLET
          </a>
        </div>
      ) : (
        <div className="header-right">
          <div className="boxed-btn cursor-pointer group !relative !w-fit !flex mt-0 gap-1">
            {shortenAddress(publicKey.toBase58())}
            {balance ? (
              <div>{toFixed(balance, 2)} SOL</div>
            ) : (
              <div>0 SOL {balance}k</div>
            )}

            <section
              onClick={handleDisconnect}
              className=" group-hover:!visible invisible absolute top-full left-0 w-full h-10 flex items-center justify-center rounded-md bg-red-300 hover:bg-red-700 duration-300 text-black hover:!text-white mt-2.5 p-1"
            >
              Disconnect
            </section>
          </div>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-[450px] bg-black "
          style={{
            borderRadius: "30px",
          }}
        >
          <div className="flex w-full justify-center items-center ">
            <div className="flex flex-col justify-start items-center space-y-5  w-[300px] md:w-[400px] overflow-y-auto ">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.adapter.name}
                  //onClick={() => select(wallet.adapter.name)}
                  onClick={() => handleWalletSelect(wallet.adapter.name)}
                  variant={"ghost"}
                  className=" h-[40px] hover:bg-transparent hover:text-white text-[20px] border-none text-white font-slackey flex w-full justify-center items-center "
                >
                  <div className="flex">
                    <Image
                      src={wallet.adapter.icon}
                      alt={wallet.adapter.name}
                      height={30}
                      width={30}
                      className="mr-5 "
                    />
                  </div>
                  <div className="font-slackey text-white wallet-name text-[20px]">
                    {wallet.adapter.name}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnection;
