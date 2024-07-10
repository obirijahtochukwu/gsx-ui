import React from "react";
import { Icons } from "./icons";

export default function Tag({
  symbol,
  icon,
}: {
  symbol: string;
  icon: JSX.Element;
}) {
  return (
    <div className="flex cursor-pointer w-fit h-10 p-2 bg-light rounded-full text-xl font-normal uppercase items-center gap-2 border border-secondary text-secondary">
      {icon}
      {symbol}
    </div>
  );
}
