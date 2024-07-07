import React from "react";

export default function NoToken({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<boolean>;
}) {
  return (
    <div className="z-20 max-sm:hidden h-full cursor-auto w-full flex text-center items-center justify-center px-5 text-base text-muted font-normal max-xlg:hidden">
      Drag and drop the token you want to swap
    </div>
  );
}
