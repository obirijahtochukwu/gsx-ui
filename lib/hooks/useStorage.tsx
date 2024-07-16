import { useEffect, useState } from "react";

export const useStorage = (introTip: number) => {
  const [data, setData] = useState("true");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const store: string | any = () =>
        JSON.parse(localStorage.getItem("walkthrough"));
      if (store() == "true") {
        setData("true");
      } else {
        setData("false");
      }
    }
  }, [introTip]);

  return { walkthrough: () => data };
};
