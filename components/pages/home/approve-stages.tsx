import React from "react";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { Token } from "@/lib/hooks/swap/useSwap.d";
import { useSwap } from "@/lib/hooks/swap/useSwap";

export default function ApproveStage({
  transactionState,
}: {
  transactionState: string;
}) {
  const { approve_stages } = useSwap();
  const isActive = (name: string, idx: number) =>
    transactionState == name ||
    transactionState == approve_stages[idx + 1]?.name ||
    transactionState == approve_stages[idx + 2]?.name
      ? true
      : false;

  return (
    <section className=" flex flex-col gap-1.5">
      {approve_stages.map(({ name, Icon }, idx) => (
        <div key={idx}>
          <div
            className={`flex gap-1 text-sm font-normal ${
              isActive(name, idx)
                ? " text-secondary hover:underline"
                : " text-muted"
            }`}
          >
            <Icon color={isActive(name, idx) ? "#4E55F1" : ""} /> {name}
          </div>
          {idx != 2 && (
            <div
              className={`h-2 w-px bg-muted ml-3 mt-1.5 ${
                isActive(name, idx) ? " bg-secondary" : " bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </section>
  );
}
