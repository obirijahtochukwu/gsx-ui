import { Chain } from "@/lib/hooks/swap/useSwap.d";
import React from "react";
import { Icons } from "./icons";

export default function Dropdown({
  IsOpen,
  handleClick,
  chains,
  chain,
  className,
}: {
  IsOpen: boolean;
  handleClick: any;
  chains: Chain[];
  chain?: Chain;
  className?: string;
}) {
  return (
    <>
      <article
        className={`${
          IsOpen
            ? " visible opacity-100 z-30"
            : " invisible opacity-0 duration-200"
        } duration-100 w-screen h-screen bg-primary/50 top-0 left-0 fixed sm:hidden`}
      ></article>
      <article
        className={`${
          IsOpen
            ? "shadow-token visible opacity-100 max-sm:translate-y-0"
            : " invisible opacity-0 max-sm:translate-y-full"
        } ${className} max-sm:w-full duration-200 z-30 fixed sm:absolute bottom-0 sm:top-full left-0 bg-white w-full h-fit rounded-tl-2xl rounded-tr-2xl sm:rounded-2xl py-6 max-sm:pr-2 sm:py-5 cursor-auto mt-0.5`}
      >
        <div className="sm:hidden text-primary px-4 text-base font-bold mb-5">
          Select Network
        </div>
        <Icons.close className="sm:hidden w-5 h-5 absolute top-4 right-4" />
        <section className="max-h-60 overflow-y-auto flex flex-col gap-4 w-full pl-4 pr-2 sm:px-5 custom-scrollbar">
          {chains.map(({ name, symbol, address, Logo }, idx) => (
            <div
              key={idx}
              onClick={() => handleClick({ name, symbol, address, Logo })}
              className={`${
                chain?.name == name ? "text-secondary" : "text-primary"
              } text-sm font-normal flex items-center gap-3 cursor-pointer`}
            >
              <Logo className={`w-5 h-5 bg-light rounded-full`} /> {name}
              {chain?.name == name ? <Icons.mark className=" ml-auto" /> : null}
            </div>
          ))}
        </section>
      </article>
    </>
  );
}
