import { useEffect, useRef, useState } from "react";

export const useClick = () => {
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
