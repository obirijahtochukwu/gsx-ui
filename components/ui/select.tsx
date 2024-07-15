import React, { useState } from "react";
import { Icons } from "./icons";
import { Chain, Token } from "../../lib/hooks/swap/useSwap.d";
import { Coin } from "./coin";
import Walkthrough from "./walkthrough";
import Dropdown from "./dropdown";
import { useSwap } from "@/lib/hooks/swap/useSwap";
import { useClick } from "@/lib/hooks/useclick";

export default function Select({
  duplicateItem,
  setDuplicateItem,
  name,
  data,
  tokens,
  handleClick,
  chain,
  setChain,
  chains,
  introTip,
  setIntroTip,
}: {
  name: string;
  data?: Token;
  tokens: Token[];
  handleClick: any;
  duplicateItem: null;
  setDuplicateItem: React.Dispatch<null>;
  chain: Chain;
  setChain: React.Dispatch<Chain>;
  chains: Chain[];
  introTip: number;
  setIntroTip: React.Dispatch<number>;
}) {
  const [IsOpen, setIsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const { walkthrough } = useSwap();
  const dropdown = useClick();

  const filteredList = tokens.filter(
    (token: any) =>
      token.name?.toLowerCase().includes(searchVal.toLowerCase()) ||
      token.address?.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <article
      className={`${
        walkthrough() && " overflow-hidden"
      } w-56 xl:w-side bg-light max-xlg:hidden h-fit rounded-3xl pt-4 pb-1`}
    >
      <div className=" text-primary text-base leading-none capitalize font-bold px-8">
        {name} Token
      </div>

      <Walkthrough
        id={name == "send" ? 1 : 4}
        title="Select network for the token you want to send"
        content="Use the dropdown to select the network for the token you are sending"
        position={name != "send" ? "right-full -translate-x-7" : ""}
        setIntroTip={setIntroTip}
        introTip={introTip}
        margin="ml-3"
      >
        <div
          ref={dropdown.targetRef}
          onClick={() => dropdown.setIsOpen(!dropdown.isOpen)}
          className={`h-10 mt-4 mx-4 bg-white w-auto gap-3 sm:gap-4 rounded-2xl text-muted text-sm font-normal items-center flex px-4 cursor-pointer capitalize relative`}
        >
          {chain?.name || "Select Network"}
          <Icons.dropdown className=" w-3.5 h-2 ml-auto" />
          <Dropdown
            IsOpen={dropdown.isOpen}
            handleClick={(chain: Chain) => setChain(chain)}
            chains={chains}
            chain={chain}
          />
        </div>
      </Walkthrough>
      <div className="h-10 mt-6 bg-white mx-4 w-auto gap-1 sm:gap-2 rounded-2xl items-center flex px-4">
        <Icons.search className="" />
        <input
          placeholder="Search name or address"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className=" text-muted text-sm font-normal h-full w-full bg-inherit border-none focus:outline-none"
        />
      </div>
      {filteredList.length > 0 ? (
        <Walkthrough
          id={name == "send" ? 2 : 5}
          title="Drag and drop the token"
          content={`Drag and drop the token you want to send into the ${
            introTip == 5 ? "right" : "left"
          } part of the swap.`}
          position={name == "send" ? "" : "right-full -translate-x-7"}
          setIntroTip={setIntroTip}
          introTip={introTip}
          margin="ml-3"
        >
          <section className="h-desktop min-h-medium custom-scrollbar pb-3 pl-4 pr-3 overflow-y-auto mt-3 gap-4 grid-cols-12 grid">
            {filteredList.map((token: Token, idx: number) => {
              const { name, symbol, address, Logo } = token;
              return (
                <Coin
                  token={token}
                  key={idx}
                  name={name}
                  idx={idx}
                  symbol={symbol}
                  Logo={Logo}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  duplicateItem={duplicateItem}
                  setDuplicateItem={setDuplicateItem}
                />
              );
            })}
          </section>
        </Walkthrough>
      ) : searchVal && filteredList.length == 0 ? (
        <div className=" h-desktop bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 justify-center items-center text-primary text-base font-normal flex">
          No result found!
        </div>
      ) : null}
    </article>
  );
}
