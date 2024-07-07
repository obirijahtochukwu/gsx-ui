import React, { useState } from "react";

export default function Walkthrough({
  id,
  className,
  position,
  disabled,
  title,
  content,
  children,
  childrenStyle,
  introTip,
  setIntroTip,
  margin,
}: {
  id: number;
  className?: string;
  position?: string;
  disabled?: boolean;
  title?: string;
  content?: string;
  introTip: number;
  setIntroTip: React.Dispatch<number>;
  margin?: string;
  childrenStyle?: string;
  children: JSX.Element;
}) {
  const walkthrough: any = () => localStorage.getItem("walkthrough");

  const close = () => {
    setIntroTip(-1);
    localStorage.setItem("walkthrough", "true");
    return "bri";
  };

  return (
    <article className={`${className} relative`}>
      <div
        className={`${
          introTip == id && introTip != 3 ? "z-40 sticky" : ""
        } ${childrenStyle}`}
      >
        {children}
      </div>
      <section
        className={`${
          !walkthrough() && id == 1
            ? " visible opacity-100 z-30"
            : " invisible opacity-0 duration-200"
        } duration-100 w-screen h-screen top-0 left-0 fixed bg-walkthrough/50`}
      ></section>

      <section
        className={`${introTip == id && !disabled ? "" : "hidden"} ${
          position || "left-full"
        } ${margin} ${
          walkthrough() && "hidden"
        } absolute top-1/2 -translate-y-1/2 h-fit w-80 rounded-lg p-3 flex-col gap-1 bg-walkthrough z-40`}
      >
        <div
          className={`${
            content && "max-w-52 mb-0.5"
          } text-sm font-bold text-white tracking-wider`}
        >
          {title}
        </div>
        <div className=" text-white text-xs font-normal leading-5">
          {content}
        </div>
        <footer className=" flex items-center gap-5 mt-3">
          {introTip != 6 ? (
            <>
              <div
                onClick={() => setIntroTip(introTip + 1)}
                className=" bg-white p-2 rounded-lg text-walkthrough-muted text-sm cursor-pointer font-bold"
              >
                Next
              </div>
              <div className=" text-dust font-semibold text-sm cursor-pointer p-2">
                Skip
              </div>
              <div className=" text-xs text-white ml-auto font-medium">
                {introTip + 1}/7
              </div>
            </>
          ) : (
            <div
              onClick={close}
              className=" bg-white p-2 rounded-lg text-walkthrough-muted text-sm cursor-pointer font-bold"
            >
              Close
            </div>
          )}
        </footer>
        <aside
          className={`${
            position?.includes("right") ? "-right-4 rotate-180" : "-left-4"
          } w-5 overflow-hidden inline-block absolute top-1/2 -translate-y-1/2`}
        >
          <div className=" h-8 bg-walkthrough -rotate-45 transform origin-top-right"></div>
        </aside>
      </section>
    </article>
  );
}
