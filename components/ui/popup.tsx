import React, { useState, useEffect, Dispatch, useRef } from "react";
import { Icons } from "./icons";
import Tag from "./tag";
import { Token } from "../../lib/hooks/swap/useSwap.d";
import NoToken from "../pages/home/no-token";
import { clickOutsideModal } from "@/lib/regrex";

export default function Popup({
  isOpen,
  setIsOpen,
  handleClick,
  data,
  selected,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  handleClick: any;
  data: Token[];
  selected?: Token;
}) {
  const [searchVal, setSearchVal] = useState("");
  const targetRef: React.MutableRefObject<any> = useRef(null);
  const { setOpen } = clickOutsideModal({
    isOpen: isOpen,
    setIsOpen,
    targetRef,
  });

  const filteredList = data.filter(
    (item: any) =>
      item.name?.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.address?.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className=" xlg:hidden">
      <section
        className={`${
          isOpen
            ? " visible opacity-100 z-40"
            : " invisible opacity-0 duration-200"
        } duration-100 w-screen h-screen top-0 left-0 fixed bg-black/10 backdrop-blur-sm`}
      ></section>
      <article
        className={`${
          isOpen
            ? "translate-x-0 z-40 visible opacity-100"
            : "-translate-x-extreme invisible opacity-0"
        } duration-200 w-screen sm:max-w-sm h-screen sm:h-fit sm:top-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 sm:left-1/2 top-0 left-0 fixed flex items-center justify-center `}
      >
        <section
          ref={targetRef}
          className="backdrop-blur-lg w-full bg-light sm:bg-white sm:rounded-2xl h-full"
        >
          <div className="sm:p-7 p-4 !pb-0">
            <div className="sm:text-token text-primary text-xl font-bold flex items-end sm:items-center justify-between">
              Select a token
              <Icons.close
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer mb-4 sm:hidden h-6 w-6"
              />
              <Icons.close
                onClick={() => setIsOpen(!isOpen)}
                color="#9F9F9F"
                className="cursor-pointer max-sm:hidden h-6 w-6"
              />
            </div>
            <div className="h-14 mt-4 sm:mt-5 w-full gap-3 sm:gap-4 rounded-2xl sm:rounded-full bg-white items-center flex p-3 overflow-hidden border-black/10 sm:border">
              <Icons.search className=" h-6 w-6" />
              <input
                placeholder="Search name or address"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className=" text-primary text-base sm:text-xl font-light h-6 w-full bg-inherit border-none focus:outline-none"
              />
            </div>

            <section className=" flex flex-wrap gap-2 items-center mt-4">
              {searchHistory.map(({ icon, symbol }) => (
                <Tag key={symbol} icon={icon} symbol={symbol} />
              ))}
            </section>
            <div className="text-primary sm:text-muted mt-10 sm:mt-8 text-sm font-normal">
              Popular tokens
            </div>
          </div>

          {filteredList.length > 0 ? (
            <main className="h-80 mt-3.5 pl-4 sm:pl-7 pb-3 pr-5 mr-2 mb-0.5 custom-scrollbar overflow-y-auto flex flex-col gap-5">
              {filteredList.map(
                ({ name, symbol, address, Logo }: Token, idx: number) => (
                  <article
                    key={idx}
                    onClick={() => {
                      handleClick({ name, symbol, address, Logo });
                      setIsOpen(!isOpen);
                    }}
                    className="cursor-pointer flex items-center font-normal text-primary gap-1.5 text-base"
                  >
                    <Logo className="h-9 w-9" />
                    <div className="">
                      <div className={`capitalize font-bold`}>{name}</div>
                      <div className="uppercase text-xs">{symbol}</div>
                    </div>
                    <div
                      className={`${
                        selected?.name == name ? "font-bold" : ""
                      } ml-auto`}
                    >
                      {address}
                    </div>
                    {selected?.name == name ? <Icons.mark /> : <></>}
                  </article>
                )
              )}
            </main>
          ) : searchVal && filteredList.length == 0 ? (
            <div className=" h-desktop bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 justify-center items-center text-primary text-base font-normal flex">
              No result found!
            </div>
          ) : null}
        </section>
      </article>
    </div>
  );
}

const searchHistory = [
  { icon: <Icons.btc />, symbol: "btc" },
  { icon: <Icons.shib />, symbol: "shib" },
];
