import { useEffect, useState } from "react";
import { Token } from "./useSwap.d";
import { tokens, approve_stages } from "../mock-data";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";

export const useSwap = () => {
  const router = useRouter();
  const walkthrough: any = () => localStorage?.getItem("walkthrough");

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
  const [slippage, setSlippage] = useState(0);
  const [fees, setFees] = useState("$94.38");
  const [priceImpact, setPriceImpact] = useState("-2.3%");
  const [transactionTime, setTransactionTime] = useState("5-8 mins.");

  const swapInfos = [
    { name: "Max. slippage", value: `${slippage}%` },
    { name: "Fees", value: fees },
    { name: "Price impact", value: priceImpact },
    { name: "Transaction time", value: transactionTime },
  ];

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
      if (transactionState == "Near (Ethereum)") {
        setTransactionState("Near (Ethereum) to USDC (Ethereum)");
      } else if (transactionState == "Near (Ethereum) to USDC (Ethereum)") {
        setTransactionState("USDC (Ethereum) to USDC (Polygon)");
      } else if (transactionState == "USDC (Ethereum) to USDC (Polygon)") {
        setTransactionState("USDC (Ethereum) to Vechain (Polygon)");
      } else if (transactionState == "USDC (Ethereum) to Vechain (Polygon)") {
        setTransactionState("Vechain (Polygon)");
      } else if (transactionState == "Vechain (Polygon)") {
        setTransactionState("pending");
      } else if (transactionState == "pending") {
        setTransactionState("success");
      } else {
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
    if (fromToken.name && toToken.name && fromAmount) {
      setToAmount(`${(+fromAmount * 8.40008686874).toFixed(2)}`);
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken.name, toToken.name]);

  // automatic setting of fromToken to display walkthrough tips
  useEffect(() => {
    if (introTip == 3) {
      setFromToken(fromTokens[0] || {});
    } else {
      if (!walkthrough()) setFromToken({});
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
    approve_stages,
    walkthrough,
  };
};
