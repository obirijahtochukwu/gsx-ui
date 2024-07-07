import React from "react";

export default function NoToken({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<boolean>;
}) {
  return (
    <div
      onClick={() => setIsOpen(true)}
      className="z-20 max-sm:hidden h-full cursor-auto w-full flex text-center items-center justify-center px-5 text-base text-muted font-normal"
    >
      <span className="xl:hidden">
        <b>Click to select</b> the token you want to swap
      </span>
      <span className="max-xl:hidden">
        Drag and drop the token you want to swap
      </span>
    </div>
  );
}
