import { useEffect, useState } from "react";
import { Icons } from "./icons";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSwap } from "@/lib/hooks/swap/useSwap";

interface toast {
  from?: string;
  to?: string;
  to_amount?: string;
}

export const ToastContainer = () => {
  const [store, setStore] = useState<toast>({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const { fromTokens, toTokens } = useSwap();

  const FromTokenIcon = fromTokens.find(
    (item) => item.symbol == store.from
  )?.Logo;
  const ToTokenIcon = toTokens.find((item) => item.symbol == store.from)?.Logo;
  console.log(store.to);

  const close = () => {
    router.push("/");
    setStore({ from: "", to: "" });
  };

  useEffect(() => {
    setStore({
      from: searchParams.get("toast-from") || "",
      to: searchParams.get("toast-to") || "",
      to_amount: searchParams.get("to-amount") || "",
    });
  }, [searchParams]);

  return (
    <div
      className={`${
        store?.from?.length != 0 ? "bounce-in-right" : "roll-out-right hidden"
      } right-4 sm:right-10 duration-500 w-80 h-fit p-3 top-20 sm:top-24 z-20 fixed rounded-2xl border border-white/10 backdrop-blur-xl shadow-gsx bg-light flex`}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 bg-zinc-300 rounded-full justify-center items-center flex">
          {FromTokenIcon && <FromTokenIcon className=" w-5 h-5" />}
        </div>
        <div className="w-8 h-8 relative -left-3 bg-zinc-300 rounded-full justify-center items-center flex">
          {ToTokenIcon && <Icons.shib className=" w-5 h-5" />}
        </div>
      </div>
      <div>
        <div className=" text-primary text-xs font-bold">
          {store.to_amount} <span className=" uppercase">{store.to}</span>{" "}
          Deposited
        </div>
        <Link
          href={"/"}
          className="text-xs flex items-center mt-1 underline font-normal text-secondary gap-1"
        >
          See transaction details
          <Icons.openLink />
        </Link>
      </div>
      <Icons.close
        onClick={() => close()}
        className="cursor-pointer ml-auto h-4 w-4"
      />
    </div>
  );
};
