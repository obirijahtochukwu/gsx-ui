import { useEffect, useRef, useState } from "react";

export const onChange = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<string>;
}) => {
  if (/^[0-9]*\.?[0-9]*$/.test(value)) {
    setValue(value);
  } else {
  }
};

export const shortenAddress = (address?: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

export const copyText = (address: string) => {
  navigator.clipboard
    .writeText(address)
    .then(() => alert(`${address} copied to clipboard`));
};

export const clickedOutside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const close = (e: any) => {
      if (targetRef.current && !targetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [targetRef]);

  return {
    isOpen,
    setIsOpen,
    targetRef,
  };
};

export const clickOutsideModal = ({
  isOpen,
  setIsOpen,
  targetRef,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  targetRef: HTMLInputElement | any;
}) => {
  useEffect(() => {
    const close = (e: any) => {
      if (targetRef.current && !targetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [targetRef]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return { setOpen: setIsOpen };
};
