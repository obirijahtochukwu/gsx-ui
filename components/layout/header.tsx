import React, { useEffect, useState } from "react";
import { links } from "./mock-data";
import Link from "next/link";
import ConnectWallet from "../ui/connect-wallet";
import { useAccount } from "wagmi";
import DisconnectWallet from "../ui/disconnect-wallet";
import Sidebar from "./sidebar";
import { Icons } from "../ui/icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { address } = useAccount();

  const props = {
    open,
    setOpen,
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      {/* <---------- modals & more ----------> */}
      <ConnectWallet {...props} />

      {/* <---------- desktop nav ----------> */}
      <nav className="flex max-sm:hidden mb-10 items-center">
        <Icons.logo />
        <section className="flex items-cente gap-8 mr-auto ml-10">
          {links.map(({ url, name }, idx) => (
            <Link
              href={url}
              className={`text-base font-normal text-primary`}
              key={idx}
            >
              {name}
            </Link>
          ))}
        </section>
        {address ? (
          <DisconnectWallet />
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="w-36 h-10 bg-secondary rounded-full justify-center items-center flex whitespace-nowrap text-base font-medium text-white"
          >
            Connect Wallet
          </button>
        )}
      </nav>

      {/* <---------- mobile nav ----------> */}
      <Sidebar setOpen={setOpen} />
    </>
  );
}
