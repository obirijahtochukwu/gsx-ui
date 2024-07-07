import React, { useState } from "react";
import PageWrapper from "../../layout/wrapper";
import SlippageSettings from "../../ui/slippage-settings";
import Divider from "../../ui/divider";
import { useSwap } from "../../../lib/hooks/swap/useSwap";
import Select from "@/components/ui/select";
import { Token } from "@/lib/hooks/swap/useSwap.d";
import Info from "./info";
import Approve from "./approve";
import SToken from "./s-token";
import SwapButton from "./swap-btn";
import Walkthrough from "@/components/ui/walkthrough";

export default function Home() {
  const [duplicateItem, setDuplicateItem] = useState(null);
  const {
    fromTokens,
    toTokens,
    setFromToken,
    fromToken,
    setToToken,
    toToken,
    setFromAmount,
    fromAmount,
    setToAmount,
    toAmount,
    swapPosition,
    swapToken,
    confirmSwap,
    setConfirmSwap,
    transactionState,
    setTransactionState,
    slippage,
    setSlippage,
    swapInfos,
    fromChains,
    toChains,
    fromChain,
    setFromChain,
    toChain,
    setToChain,
    introTip,
    setIntroTip,
  } = useSwap();

  const props = {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    setFromAmount,
    fromAmount,
    setToAmount,
    toAmount,
    swapPosition,
    duplicateItem,
    setDuplicateItem,
    confirmSwap,
    setConfirmSwap,
    transactionState,
    setTransactionState,
    slippage,
    setSlippage,
    swapInfos,
    fromChains,
    toChains,
    fromChain,
    setFromChain,
    toChain,
    setToChain,
    swapToken,
    introTip,
    setIntroTip,
  };

  return (
    <PageWrapper>
      <Approve {...props} />

      <article className="flex justify-between items-center max-w-home mx-auto">
        <Select
          name="send"
          data={fromToken}
          handleClick={(token: Token) => setFromToken(token)}
          tokens={fromTokens}
          chain={fromChain}
          setChain={setFromChain}
          chains={fromChains}
          {...props}
        />
        <div className="max-w-xl mx-auto w-full">
          <section className=" text-2xlg sm:text-5xl font-bold  text-primary leading-normal flex justify-between items-end sm:items-center mb-3">
            <Walkthrough
              id={0}
              title="Welcome to GSX! Let’s walk you through for the best user experience."
              margin={"ml-5"}
              {...props}
            >
              <>Swap</>
            </Walkthrough>
            <SlippageSettings {...props} />
          </section>
          <div className="flex max-sm:flex-col relative gap-2 h-fit">
            <SToken
              {...props}
              name={"fromTokens"}
              tokens={fromTokens}
              token={fromToken}
              setToken={setFromToken}
              amount={fromAmount}
              setAmount={setFromAmount}
              chain={fromChain}
              setChain={setFromChain}
              chains={fromChains}
            />
            <Divider {...props} />
            <SToken
              {...props}
              name={"toTokens"}
              tokens={toTokens}
              token={toToken}
              setToken={setToToken}
              amount={toAmount}
              setAmount={setToAmount}
              chain={toChain}
              setChain={setToChain}
              chains={toChains}
            />
          </div>
          <SwapButton {...props} />
          {fromToken.name && toToken?.name && <Info {...props} />}
        </div>
        <Select
          name="recieve"
          data={toToken}
          tokens={toTokens}
          handleClick={(token: Token) => setToToken(token)}
          chain={toChain}
          setChain={setToChain}
          chains={toChains}
          {...props}
        />
      </article>
    </PageWrapper>
  );
}
