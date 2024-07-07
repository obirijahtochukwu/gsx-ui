import { Icons } from "@/components/ui/icons";
import { swapInfos } from "@/lib/hooks/swap/useSwap.d";
import React, { useState } from "react";
// import { Icons } from "./icons";

export default function Info({ swapInfos }: { swapInfos: swapInfos[] }) {
  return (
    <section className={`flex mt-5 sm:mt-4 w-full flex-col gap-3.5 sm:gap-2.5`}>
      {swapInfos.map(({ name, value }, idx) => (
        <div
          key={idx}
          className="flex text-xs gap-2 sm:text-base  font-normal justify-between"
        >
          <div className=" text-black flex gap-2 items-center">
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
  );
}
