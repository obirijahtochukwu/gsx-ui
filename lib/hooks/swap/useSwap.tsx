import { useEffect, useState } from "react";
import { Token } from "./useSwap.d";
import { tokens } from "../mock-data";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";

export const useSwap = () => {
  const router = useRouter();

  const [slippage, setSlippage] = useState(0);
  const [confirmSwap, setConfirmSwap] = useState(false);
  const [fromChains, setFromChains] = useState<Token[]>(tokens);
  const [toChains, setToChains] = useState<Token[]>(tokens);
  const [fromChain, setFromChain] = useState<Token>({});
  const [toChain, setToChain] = useState<Token>({});
  const [fromTokens, setFromTokens] = useState<Token[]>(
    tokens.map((item) => ({ ...item, category: "fromTokens" }))
  );
  const [toTokens, setToTokens] = useState<Token[]>(
    tokens.map((item) => ({ ...item, category: "toTokens" }))
  );
  const [fromToken, setFromToken] = useState<Token>({});
  const [toToken, setToToken] = useState<Token>({});
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [transactionState, setTransactionState] = useState("");
  const [introTip, setIntroTip] = useState(0);
  const swapInfos = [
    { name: "Max. slippage", value: `${slippage}%` },
    { name: "Fees", value: "$94.38" },
    { name: "Price impact", value: "-2.3%" },
    { name: "Transaction time", value: "5-8 mins." },
  ];

  const draggedItem = JSON.parse(localStorage.getItem("draggedItem") || "");

  // change token position
  const swapPosition = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // swap token
  const swapToken = () => {
    if (fromAmount) {
      setConfirmSwap(true);
    }
  };

  // proccessing swap and setting toast message
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (transactionState == `pending`) {
        setTransactionState("success");
      }
    }, 3000);

    if (transactionState == "success") {
      setFromAmount("");
      setToAmount("");
      setToChain({});
      setFromChain({});
      setSlippage(0);
      router.push(
        `?toast-from=${fromToken.symbol}&toast-to=${toToken.symbol}&to-amount=${toAmount}`
      );
    }
    return () => clearTimeout(timeout);
  }, [transactionState]);

  // calculate token amount
  useEffect(() => {
    if (fromAmount == "") {
      setToAmount("");
    } else {
      setToAmount(`${(+fromAmount * 8.40008686874).toFixed(2)}`);
    }
  }, [fromAmount]);

  // automatic selection of fromToken to display walkthrough tips
  useEffect(() => {
    if (introTip == 3) {
      setFromToken(fromTokens[0] || {});
    } else {
      setFromToken({});
    }
  }, [introTip]);

  return {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    swapPosition,
    fromTokens,
    toTokens,
    swapToken,
    draggedItem,
    confirmSwap,
    setConfirmSwap,
    transactionState,
    setTransactionState,
    slippage,
    setSlippage,
    swapInfos,
    fromChains,
    toChains,
    fromChain,
    setFromChain,
    toChain,
    setToChain,
    introTip,
    setIntroTip,
  };
};
