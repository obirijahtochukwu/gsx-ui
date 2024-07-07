import React from "react";
import { Icons } from "./icons";

export default function Swap({ swapPosition }: { swapPosition: any }) {
  return (
    <div className=" absolute top-64 max-sm:mt-2 sm:top-28 mt-3 z-20 left-1/2 -translate-x-1/2 w-fit flex h-fit rounded-full items-center">
      <Icons.swap
        className="max-sm:rotate-90  z-20 cursor-pointer mx-auto max-sm:h-14 max-sm:w-14"
        onClick={() => swapPosition()}
      />
    </div>
  );
}
