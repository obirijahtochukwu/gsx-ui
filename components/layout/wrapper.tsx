import React, { useEffect, useState } from "react";
import Header from "./header";
import { config } from "../../lib/providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ToastContainer } from "../ui/toast";

const queryClient = new QueryClient();

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <article className="p-4 max-sm:pb-10 z-10 sm:py-8 sm:px-10">
          <img
            src="/media/home/bg.png"
            className="-z-1 w-1/2 h-screen bg-cover fixed top-0 left-0"
          />
          <img
            style={{ transform: " rotateY(180deg)" }}
            src="/media/home/bg.png"
            className="-z-1 w-1/2 h-screen bg-cover fixed top-0 right-0"
          />
          <Header />
          <div>{children}</div>
        </article>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
