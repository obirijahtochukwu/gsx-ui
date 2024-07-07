import React, { useEffect, useRef, useState } from "react";
import { Icons } from "./icons";
import { useAccount, useDisconnect } from "wagmi";
import { shortenAddress, copyText } from "../../lib/regrex";

export default function DisconnectWallet() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const [open, setOpen] = useState(false);

  const logout = () => {
    disconnect();
    setOpen(false);
    window.location.reload();
  };

  return (
    <section
      onMouseOver={() => setOpen(true)}
      onClick={() => setOpen(!open)}
      className=" relative group w-fit pb-1"
    >
      <div
        className={
          " gap-2.5 h-10 sm:h-12 max-sm:w-32 sm:px-3 flex justify-center items-center text-sm bg-secondary text-light font-bold cursor-pointer rounded-full"
        }
      >
        <Icons.metarmask className="h-4 w-4" />
        {shortenAddress(address)}
      </div>
      <section
        className={`${
          open
            ? "group-hover:visible group-hover:opacity-100 group-hover:mt-0"
            : ""
        } invisible opacity-0 duration-200 mt-3 absolute top-full max-sm:left-1/2 max-sm:-translate-x-1/2 sm:right-0 w-36 z-10 flex flex-col rounded-2xl bg-secondary text-white text-sm font-normal`}
      >
        <div
          onClick={() => copyText(address || "")}
          className="flex cursor-pointer items-center gap-2 px-3 pt-3 pb-1.5"
        >
          <Icons.copy />
          Copy address
        </div>
        <div
          onClick={logout}
          className="flex cursor-pointer items-center gap-2 px-3 pt-1.5 pb-3 "
        >
          <Icons.disconnect />
          Disconnect
        </div>
      </section>
    </section>
  );
}
