import React, { useEffect, useState } from "react";
import { Chain, Token } from "../../../lib/hooks/swap/useSwap.d";
import { onChange } from "../../../lib/regrex";
import { Icons } from "@/components/ui/icons";
import NoToken from "./no-token";
import Popup from "@/components/ui/popup";
import Walkthrough from "@/components/ui/walkthrough";

export default function SToken({
  name,
  tokens,
  token,
  setToken,
  amount,
  setAmount,
  duplicateItem,
  chain,
  setChain,
  chains,
  introTip,
  setIntroTip,
}: {
  name: string;
  tokens: Token[];
  token: Token;
  setToken: React.Dispatch<Token>;
  amount: string;
  setAmount: React.Dispatch<string>;
  duplicateItem: any;
  chain: Chain;
  setChain: React.Dispatch<Chain>;
  chains: Chain[];
  introTip: number;
  setIntroTip: React.Dispatch<number>;
}) {
  const [dragErr, setDragErr] = useState(false);
  const [dragSuccess, setDragSuccess] = useState(false);
  const [IsToken, setIsToken] = useState(false);
  const [IsChain, setIsChain] = useState(false);
  const { Logo } = token || {};

  const handleDrop = (e: any) => {
    const draggedItem = JSON.parse(localStorage.getItem("draggedItem") || "");
    const itemId = JSON.parse(e.dataTransfer.getData("text/plain"));
    const item = tokens.find((item, idx) => idx === itemId.id) || {};
    setDragSuccess(false);
    if (draggedItem?.category == name) {
      setToken(item);
    } else {
      localStorage.removeItem("draggedItem");
      setDragErr(false);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    const draggedItem = JSON.parse(localStorage.getItem("draggedItem") || "");
    if (draggedItem?.category != name) {
      setDragErr(true);
      duplicateItem.style.border = "4px solid red";
    } else {
      setDragSuccess(true);

      duplicateItem.style.border = "4px solid #4CC900";
    }
  };

  const handDragLeave = (e: any) => {
    e.preventDefault();
    duplicateItem.style.border = "transparent";
    setDragErr(false);
    setDragSuccess(false);
  };

  return (
    <>
      <Popup
        IsOpen={IsToken}
        setIsOpen={setIsToken}
        handleClick={(token: Token) => setToken(token)}
        data={tokens}
        selected={token}
      />
      <Popup
        type={"chain"}
        IsOpen={IsChain}
        setIsOpen={setIsChain}
        handleClick={(chain: Chain) => setChain(chain)}
        data={chains}
        selected={chain}
      />
      <Walkthrough
        id={3}
        title="Enter Amount"
        content="Enter the amount for the token you want to send"
        position="right-full -translate-x-10 mt-24"
        disabled={name == "toTokens" && introTip != 5 && true}
        setIntroTip={setIntroTip}
        introTip={introTip}
      >
        <main
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handDragLeave}
          className={`${
            dragErr ? "bg-error" : dragSuccess ? "bg-success" : " bg-light"
          } ${
            introTip == 3 && name == "fromTokens"
              ? "!sticky z-40 "
              : introTip == 2 && name == "fromTokens"
              ? "!sticky z-30 "
              : introTip == 5 && name == "toTokens"
              ? "!sticky z-30 "
              : ""
          }  sm:w-72 h-72 sm:h-80 flex flex-col rounded-3xl p-6 `}
        >
          <section className={`${token?.name || " xlg:hidden"} cursor-pointer`}>
            <div
              onClick={() => setIsChain(true)}
              className="flex items-center gap-2 text-base font-bold sm:font-normal text-primary mb-6 capitalize group sm:mb-4 cursor-pointer w-fit"
            >
              {chain?.name || "Network"}{" "}
              <Icons.dropdown className="group-hover:-rotate-90 duration-100" />
            </div>
            <div
              onClick={() => setIsToken(true)}
              className="text-primary  text-xl"
            >
              <div className="font-normal flex items-center gap-2 uppercase">
                {token.name ? (
                  <>
                    <Logo /> {token?.symbol}
                  </>
                ) : (
                  <>
                    <Icons.tokenPlaceholder />
                    <div className=" capitalize">Select token</div>
                  </>
                )}
              </div>
              <div className="font-medium capitalize">{token?.name}</div>
              {name == "fromTokens" && token.name && (
                <div className="flex items-center gap-3">
                  <div className=" text-base text-muted font-normal">
                    Balance: 192.2811
                  </div>

                  <div className="text-base font-bold border-sky-900 border rounded-full py-0.5 px-2.5 cursor-pointer gap-2.5 text-sky-900 flex">
                    MAX
                  </div>
                </div>
              )}
            </div>
          </section>
          <section className={`${token?.name || " xlg:hidden"} mt-auto`}>
            <div className=" font-normal leading-normal text-base sm:text-xl text-primary">
              You {name == "fromTokens" ? "pay" : "recieve"}
            </div>
            <input
              disabled={token.name && name == "fromTokens" ? false : true}
              value={amount}
              onChange={(e: any) =>
                onChange({ value: e.target.value, setValue: setAmount })
              }
              placeholder="0.00"
              className={`font-normal text-3xl text-primary leading-normal w-full border-b border-transparent focus:border-primary border-opacity-20 focus:outline-none bg-inherit`}
            />

            <div className=" leading-normal text-base font-normal text-primary">
              {amount ? "$35,315.05" : "$0"}
            </div>
          </section>
          {token?.name ? null : <NoToken setIsOpen={setIsToken} />}
        </main>
      </Walkthrough>
    </>
  );
}
