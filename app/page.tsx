"use client";
import { Suspense } from "react";
import Home from "../components/pages/home";
import { ToastContainer } from "@/components/ui/toast";

export default function Page(): JSX.Element {
  return (
    <>
      <Home />
      <Suspense>
        <ToastContainer />
      </Suspense>
    </>
  );
}
