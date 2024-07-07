import React from "react";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { Token } from "@/lib/hooks/swap/useSwap.d";

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
  const FromTokenIcon = fromToken?.Logo;
  const ToTokenIcon = toToken?.Logo;

  return (
    <section>
      {transactionState == "pending" ? (
        <>
          <div className="spinner mx-auto h-28 my-5 w-28" />
          <div className="text-xl leading-normal text-primary text-center font-normal">
            Waiting for confirmation
          </div>
        </>
      ) : transactionState == "success" ? (
        <>
          <Icons.success className=" mx-auto h-28 my-5 w-28" />

          <div className="text-xl text-primary text-center font-normal">
            Transaction successful{" "}
          </div>
        </>
      ) : transactionState == "failed" ? (
        <>
          <Icons.failed className=" mx-auto h-28 my-5 w-28" />
          <div className="text-xl text-primary text-center font-normal">
            Transaction failed{" "}
          </div>
        </>
      ) : null}
      <div className="text-sm flex items-center my-2 text-primary text-center justify-center font-normal gap-1">
        {FromTokenIcon && <FromTokenIcon className=" w-4 h-4" />} {fromAmount}
        <span className="uppercase">{fromToken.symbol}</span>
        <Icons.leftArrow className=" w-2.5 rotate-180" />
        {ToTokenIcon && <ToTokenIcon className=" w-4" />} {toAmount}
        <span className="uppercase">{toToken.symbol}</span>
      </div>
      <div className=" flex justify-center">
        <Link
          href={"/"}
          className="text-sm underline text-link flex justify-center w-fit font-normal"
        >
          View on block explorer
        </Link>
      </div>
    </section>
  );
}

// const Stages = ()=>{
//     return (
//       <>
//         {transactionState.length == 0 ? (
//           <>

//             {children}
//           </>
//         ) : (
//           <section className=" flex flex-col gap-1.5">
//             {approve_stages.map(({ name, Icon }, idx) => (
//               <div key={idx}>
//                 <div
//                   className={`flex gap-1 text-sm font-normal ${
//                     transactionState.find((state) => state == name)
//                       ? " text-secondary hover:underline"
//                       : " text-muted"
//                   }`}
//                 >
//                   <Icon
//                     color={
//                       transactionState.find((state) => state == name)
//                         ? "#4E55F1"
//                         : ""
//                     }
//                   />{" "}
//                   {name}
//                 </div>
//                 {idx != 2 && (
//                   <div
//                     className={`h-2 w-px bg-muted ml-3 mt-1.5 ${
//                       transactionState.find((state) => state == name)
//                         ? " bg-secondary"
//                         : " bg-muted"
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </section>
//         )}
//       </>
//     );
// }
