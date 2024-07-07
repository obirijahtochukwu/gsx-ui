import React, { useEffect, useRef } from "react";
import { Icons } from "./icons";
import { useAccount, useConnect } from "wagmi";
import DisconnectWallet from "./disconnect-wallet";

export default function ConnectWallet({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}) {
  const { connectors, connect, isPending } = useConnect();

  const { address } = useAccount();
  const metarmaskConnector = connectors.filter(
    (connector) => connector.id == "io.metamask"
  );

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const close = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [ref]);

  useEffect(() => {
    if (address) {
      setOpen(false);
    }
  }, [address]);

  return (
    <>
      <section
        className={`${
          open
            ? " visible opacity-100 z-40"
            : " invisible opacity-0 duration-200"
        } duration-100 w-screen h-screen top-0 left-0 fixed bg-white/40 backdrop-blur-sm`}
      ></section>

      <nav
        ref={ref}
        className={`${
          open
            ? "max-sm:translate-y-0"
            : " max-sm:translate-y-full sm:translate-x-full"
        } duration-300 bg-light max-sm:rounded-tl-3xl max-sm:rounded-tr-3xl bottom-0 sm:top-0 right-0 z-50 sm:w-fit w-full shadow sm:border border-white max-sm:h-fit border-opacity-20 backdrop-blur-xl py-5 px-4 sm:p-11 fixed h-screen`}
      >
        <Icons.close
          onClick={() => setOpen(false)}
          className="cursor-pointer absolute top-4 sm:top-5 right-4 sm:right-5 h-5 w-5"
        />
        <div className="text-primary sm:text-primary text-base max-sm:mb-7 sm:text-3xl font-bold">
          Connect a wallet
        </div>
        <div className=" w-80 text-muted text-base leading-6 max-sm:hidden font-medium mt-5 mb-8">
          If you currently don't have a wallet, you have the option to choose a
          provider and generate one at this moment.
        </div>
        <section className=" bg-white rounded-2xl px-6 sm:py-6 flex flex-col sm:gap-5">
          {metarmaskConnector.map(
            (connector, index) =>
              index == 0 && (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  className="flex gap-4 items-center cursor-pointer max-sm:py-4 text-primary text-base font-bold"
                >
                  <Icons.metarmask />
                  Metamask
                </button>
              )
          )}
          <div className="w-full h-px border border-muted/10"></div>
          <div className="flex gap-4 max-sm:py-4 items-center text-primary text-sm sm:text-base font-bold">
            <Icons.wallectConnect />
            WalletConnect
          </div>
          <div className="w-full h-px border border-muted/10"></div>
          <div className="flex gap-4 max-sm:py-4 items-center text-primary text-sm sm:text-base font-bold">
            <Icons.coinbase />
            Coinbase Wallet
          </div>
        </section>
      </nav>
    </>
  );
}
