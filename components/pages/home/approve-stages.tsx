import React from "react";
import { Icons } from "@/components/ui/icons";
import { Token } from "@/lib/hooks/swap/useSwap.d";
import { useSwap } from "@/lib/hooks/swap/useSwap";

export default function ApproveStage({
  transactionState,
  fromToken,
  toToken,
  toAmount,
  fromAmount,
}: {
  fromToken: Token;
  toToken: Token;
  toAmount: string;
  fromAmount: string;
  transactionState: string;
}) {
  const { approve_stages } = useSwap();
  const FromTokenIcon = fromToken?.Logo;
  const ToTokenIcon = toToken?.Logo;
  const isActive = (name: string, idx: number) =>
    transactionState == name ||
    transactionState == approve_stages[idx + 1]?.name ||
    transactionState == approve_stages[idx + 2]?.name ||
    transactionState == approve_stages[idx + 3]?.name ||
    transactionState == approve_stages[idx + 4]?.name
      ? true
      : false;

  return (
    <section>
      <div className="text-base sm:text-sm text-primary font-bold">
        Transaction in process
      </div>
      <div className="bg-white w-full h-10 flex items-center justify-center gap-2.5 rounded-xl mt-4 mb-2 text-sm text-primary font-normal">
        <Icons.timer /> ETA: 20 sec.
      </div>
      <section className="text-sm w-full h-9 bg-white rounded-xl flex items-center my-2 text-primary text-center justify-center font-normal gap-1 mb-4">
        {FromTokenIcon && <FromTokenIcon className=" w-4 h-4" />} {fromAmount}
        <span className="uppercase">{fromToken.symbol}</span>
        <Icons.leftArrow className=" w-2.5 rotate-180" />
        {ToTokenIcon && <ToTokenIcon className=" w-4" />} {toAmount}
        <span className="uppercase">{toToken.symbol}</span>
      </section>
      {approve_stages.map(({ name, icons }, idx) => (
        <section key={idx} className="flex gap-8 px-5">
          <aside className="flex flex-col items-center w-12">
            <div className="flex">
              {icons.map(({ Chain, Icon }, idx) => (
                <div key={idx} className="w-6 h-6 rounded-full relative">
                  <Icon className={`${idx == 1 && " relative -left-1 z-10"}`} />
                  <div className=" absolute -top-2 right-0 h-3.5 w-3.5 bg-warning rounded-full flex items-center justify-center">
                    <Chain />
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`${idx == 4 && "hidden"} h-2 w-px bg-muted mb-4 mt-2`}
            />
          </aside>
          <main
            className={`${
              isActive(name, idx) ? "text-secondary" : "text-token"
            } flex gap-2 leading-none items-start text-xs font-normal`}
          >
            <div className="flex flex-col items-center relative">
              <div
                className={`${
                  isActive(name, idx)
                    ? " bg-secondary"
                    : "bg-white border-token"
                } w-3.5 h-3.5 rounded-full border z-10 flex items-center justify-center duration-200`}
              >
                <Icons.mark color="#F6F6F6" className="h-1 w-1.5" />
              </div>
              <div
                className={`${idx == 4 && "hidden"} ${
                  isActive(name, idx) ? " bg-secondary" : "bg-token"
                } absolute h-14 w-1 top-11/12 duration-200`}
              ></div>
            </div>
            {name}
          </main>
        </section>
      ))}
    </section>
  );
}
