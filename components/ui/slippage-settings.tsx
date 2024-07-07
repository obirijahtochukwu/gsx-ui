import React, { useEffect, useRef, useState } from "react";
import { Icons } from "./icons";

export default function SlippageSettings({
  slippage,
  setSlippage,
}: {
  slippage: number;
  setSlippage: React.Dispatch<number>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<any>(null);

  const handleChange = () => {
    const value = inputRef.current.value;
    const newValue = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    if (newValue < 100) {
      setSlippage(newValue);
    } else {
      setSlippage(100);
    }
  };

  return (
    <div className=" group relative group sm:pb-3 flex items-center">
      <div className="bg-light text-base font-bold text-primary rounded-full cursor-pointer flex items-center gap-2.5 py-2 px-3">
        <Icons.setting className="" />
        Settings
      </div>
      <section
        className={`${
          isOpen ? "h-36" : "sm:h-16 h-12"
        } overflow-hidden duration-300 absolute shadow-2xl right-0 invisible group-hover:visible top-full w-72 z-30 sm:w-80 bg-light bg-opacity-10 rounded-2xl group-hover:opacity-100 px-5 sm:p-5 border border-white border-opacity-5 backdrop-blur-2xl`}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-primary max-sm:h-full max-sm:max-h-14 text-base sm:text-xl font-normal justify-between items-center gap-1.5 cursor-pointer"
        >
          Max. slippage{" "}
          <Icons.info className="h-4 w-4 mr-auto" color="#191D20" />{" "}
          {slippage ? slippage : "Auto "}
          <Icons.dropdown className=" w-4" color="#191D20" />
        </div>

        <footer className="flex gap-6 w-full justify-center mt-8">
          <div className="max-w-36 w-full grid grid-cols-12 h-fit py-0.5 bg-white px-0.5 rounded-lg text-sm text-primary font-normal gap-0.5 items-center">
            <div
              className={`${
                slippage ? "" : "bg-secondary text-white"
              } h-9 col-span-6 rounded-md justify-center items-center flex`}
            >
              Auto
            </div>
            <div
              className={`${
                slippage ? "bg-secondary text-white" : " "
              } h-9 col-span-6 rounded-md justify-center items-center flex`}
            >
              Custom
            </div>
          </div>
          <div className="rounded-lg w-32 h-10 gap-1 items-center flex p-3 bg-white">
            <input
              type="text"
              placeholder="0.50"
              ref={inputRef}
              value={slippage == 0 ? "" : slippage}
              onChange={handleChange}
              className="text-right text-primary text-sm font-normal bg-inherit h-full focus:outline-none w-full"
            />
            <div className="text-sm font-normal text-primary">%</div>
          </div>
        </footer>
      </section>
    </div>
  );
}
