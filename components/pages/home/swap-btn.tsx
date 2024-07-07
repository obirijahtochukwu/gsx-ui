import Walkthrough from "@/components/ui/walkthrough";
import { Chain, Token } from "@/lib/hooks/swap/useSwap.d";
import React from "react";

export default function SwapButton({
  fromAmount,
  fromToken,
  toToken,
  swapToken,
  toChain,
  fromChain,
  introTip,
  setIntroTip,
}: {
  fromAmount: string;
  fromToken: Token;
  toToken: Token;
  toChain: Chain;
  fromChain: Chain;
  swapToken: any;
  introTip: number;
  setIntroTip: React.Dispatch<number>;
}) {
  const isSwapReady =
    fromToken.name &&
    toToken?.name &&
    fromAmount &&
    fromChain.name &&
    toChain.name
      ? true
      : false;

  return (
    <Walkthrough
      id={6}
      title="Initiate transaction"
      content="Click on this button to initiate transaction"
      setIntroTip={setIntroTip}
      introTip={introTip}
      margin="ml-4 mt-2"
    >
      <button
        onClick={() => swapToken()}
        disabled={isSwapReady ? false : true}
        className={`${
          isSwapReady
            ? `${fromAmount ? " bg-secondary" : " bg-red-950"}`
            : "bg-muted"
        } w-full py-3 sm:py-4 text-white rounded-full mt-5 text-center text-base sm:text-xl font-bold capitalize`}
      >
        {fromToken.name && toToken?.name ? (
          <>
            {!fromChain.name || !toChain.name ? (
              <>select network</>
            ) : fromAmount ? (
              <div>
                Get <span className="uppercase">{toToken?.symbol}</span>
              </div>
            ) : (
              <div>Enter Value</div>
            )}
          </>
        ) : (
          "Drag & drop a token to start"
        )}
      </button>
    </Walkthrough>
  );
}
