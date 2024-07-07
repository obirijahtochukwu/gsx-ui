import React from "react";
import Dialog from "../../ui/dialog";
import { Token, swapInfos } from "@/lib/hooks/swap/useSwap.d";
import ApproveStage from "./approve-stages";
// import { swap_infos } from "./info";
import { Icons } from "@/components/ui/icons";

export default function Approve({
  confirmSwap,
  setConfirmSwap,
  fromToken,
  toToken,
  toAmount,
  fromAmount,
  transactionState,
  setTransactionState,
  swapInfos,
}: {
  confirmSwap: boolean;
  setConfirmSwap: React.Dispatch<boolean>;
  fromToken: Token;
  toToken: Token;
  toAmount: string;
  fromAmount: string;
  transactionState: string;
  setTransactionState: React.Dispatch<string>;
  swapInfos: swapInfos[];
}) {
  const FromTokenIcon = fromToken?.Logo;
  const ToTokenIcon = toToken?.Logo;

  const close = () => {
    setTransactionState("");
    setConfirmSwap(false);
  };

  const props = {
    transactionState,
    fromToken,
    toToken,
    toAmount,
    fromAmount,
  };

  return (
    <Dialog
      IsOpen={confirmSwap}
      onClose={close}
      form={transactionState == "pending" ? true : false}
      classname=" gap-6"
    >
      {transactionState == "" ? (
        <>
          <div className="text-base sm:text-sm text-primary font-bold">
            Review Swap
          </div>
          <section className="flex items-center justify-between">
            <div className="">
              <div className=" text-base font-normal text-muted">You pay</div>
              <div className="flex items-center gap-1 text-xl font-normal text-primary uppercase">
                {fromAmount} {fromToken?.symbol}
              </div>
              <div className=" text-base font-normal text-muted">$1241</div>
            </div>
            {fromToken?.Logo && <FromTokenIcon />}
          </section>
          <section className="flex items-center justify-between">
            <div className="">
              <div className=" text-base font-normal text-muted">
                You receive
              </div>
              <div className="flex items-center text-xl leading-normal font-normal uppercase text-primary">
                {toAmount} <div className="ml-1"></div>
                {toToken?.symbol}
              </div>
              <div className=" text-base font-normal text-muted">$1241</div>
            </div>
            {toToken?.Logo && <ToTokenIcon />}
          </section>
          <section className={`flex flex-col gap-3.5`}>
            {swapInfos.map(({ name, value }, idx) => (
              <div
                key={idx}
                className="flex text-xs gap-2 font-normal justify-between"
              >
                <div className=" text-muted flex gap-1 items-center">
                  {name} <Icons.info />
                </div>
                {idx == 0 && (
                  <div className="w-10 h-5 ml-auto bg-orange-100 rounded-full justify-center items-center flex text-stone-500 text-xs font-normal">
                    Auto
                  </div>
                )}
                {value}
              </div>
            ))}
          </section>
          <button
            onClick={() => setTransactionState("pending")}
            className=" bg-secondary w-full rounded-full flex items-center justify-center h-11 text-white text-base font-bold"
          >
            Approve and Swap
          </button>
        </>
      ) : (
        <ApproveStage {...props} />
      )}
    </Dialog>
  );
}
