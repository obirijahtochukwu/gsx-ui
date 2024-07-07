import React, { useState, useEffect, Dispatch, useRef } from "react";
import { Icons } from "./icons";
import Tag from "./tag";
import { Token } from "../../lib/hooks/swap/useSwap.d";
import NoToken from "../pages/home/no-token";

export default function Popup({
  type,
  IsOpen,
  setIsOpen,
  handleClick,
  data,
  selected,
}: {
  type?: string;
  IsOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  handleClick: any;
  data: Token[];
  selected?: Token;
}) {
  const [searchVal, setSearchVal] = useState("");
  const ref: React.MutableRefObject<any> = useRef(null);

  const filteredList = data.filter(
    (item: any) =>
      item.name?.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.address?.toLowerCase().includes(searchVal.toLowerCase())
  );

  useEffect(() => {
    if (IsOpen && window.innerWidth < 1280) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [IsOpen]);

  useEffect(() => {
    const leave = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", leave);

    return () => {
      window.removeEventListener("mousedown", leave);
    };
  }, [ref]);

  return (
    <article
      className={`${
        IsOpen ? "translate-x-0 z-40" : "-translate-x-[120%]"
      } duration-200 w-screen sm:max-w-sm h-screen top-0 left-0 fixed flex items-center ${
        type || "xl:hidden"
      } shadow-2xl justify-center `}
    >
      <section
        ref={ref}
        className="pb-4 backdrop-blur-lg w-full bg-light h-full"
      >
        <div className="sm:p-7 pt-3 px-4 !pb-0">
          <div className="text-primary text-xl font-normal flex items-end sm:items-center justify-between">
            Select {type ? "network" : "a token"}
            <Icons.close
              onClick={() => setIsOpen(false)}
              className="cursor-pointer max-sm:mb-4 h-6 w-6"
            />
          </div>

          <div className="h-12 mt-4 sm:mt-5 w-full gap-3 rounded-2xl bg-white items-center flex p-3 overflow-hidden">
            <Icons.search className=" h-6 w-6" />
            <input
              placeholder="Search name or address"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className=" text-primary text-base sm:text-xl font-light h-full w-full bg-inherit border-none focus:outline-none"
            />
          </div>

          <section className=" flex flex-wrap gap-2 items-center mt-5 sm:mt-4">
            {searchHistory.map(({ icon, symbol }) => (
              <Tag key={symbol} icon={icon} symbol={symbol} />
            ))}
          </section>
          <div className="text-primary mt-10 text-sm font-normal">
            Popular data
          </div>
        </div>

        {filteredList.length > 0 ? (
          <main className="h-mobile mt-3 pl-4 mb-3 pr-5 mr-2 max custom-scrollbar overflow-y-auto flex flex-col gap-5">
            {filteredList.map(
              ({ name, symbol, address, Logo }: Token, idx: number) => (
                <article
                  key={idx}
                  onClick={() => {
                    handleClick({ name, symbol, address, Logo });
                    setIsOpen(false);
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
  );
}

const searchHistory = [
  { icon: <Icons.btc />, symbol: "btc" },
  { icon: <Icons.shib />, symbol: "shib" },
];
