import React, { useEffect, useRef, useState } from "react";
import { Icons } from "./icons";

export default function Dialog({
  IsOpen,
  classname,
  onClose,
  form,
  children,
}: {
  IsOpen: boolean;
  onClose: any;
  classname?: string;
  form?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  const targetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const close = (e: any) => {
      if (!form) {
        if (targetRef.current && !targetRef.current.contains(e.target)) {
          console.log(form);
          onClose();
        }
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [targetRef, form]);

  useEffect(() => {
    if (IsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [IsOpen]);

  return (
    <>
      {" "}
      <article
        className={`${
          IsOpen
            ? " visible opacity-100 z-40"
            : " invisible opacity-0 duration-200"
        } duration-100 w-screen h-screen bg-primary/50 top-0 left-0 fixed flex items-center justify-center `}
      ></article>
      <section
        ref={targetRef}
        className={
          classname +
          `${
            IsOpen
              ? " max-sm:translate-y-0 opacity-100 sm:slide-top sm:-translate-y-1/2"
              : " translate-y-full opacity-0"
          } z-40 sm:-translate-x-1/2 sm:left-1/2 rounded-tl-2xl duration-300 rounded-tr-2xl sm:rounded-3xl fixed left-0 bottom-0 transform h-fit sm:top-1/2 sm:p-6 flex flex-col p-4 border border-white/10  w-full sm:w-80 bg-gray shadow-gsx`
        }
      >
        {form || (
          <Icons.close
            onClick={onClose}
            className="cursor-pointer absolute top-3 sm:top-5 right-3 sm:right-5 h-4 w-4"
          />
        )}
        {children}
      </section>
    </>
  );
}
