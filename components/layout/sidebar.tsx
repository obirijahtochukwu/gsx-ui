import React, { useState } from "react";
import { Icons } from "../ui/icons";
import { useAccount } from "wagmi";
import DisconnectWallet from "../ui/disconnect-wallet";

export default function Sidebar({
  setOpen,
}: {
  setOpen: React.Dispatch<boolean>;
}) {
  const { address } = useAccount();

  return (
    <section className="flex sm:hidden justify-between items-center mb-9">
      <Icons.logo />
      {address ? (
        <DisconnectWallet />
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-36 h-10 bg-secondary rounded-full justify-center items-center flex whitespace-nowrap text-base font-medium text-white"
        >
          Connect Wallet
        </button>
      )}{" "}
      <Icons.bar className=" cursor-pointer" />
    </section>
  );
}
