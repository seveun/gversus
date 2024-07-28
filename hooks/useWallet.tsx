import { useState, useEffect } from "react";
import User from "@/types/User";

type walletType = "EUR" | "USD" | "BTC" | "ETH" | "LTC" | "USDT";

export const useWallet = (user?: User) => {
  const [wallet, setWallet] = useState("" as walletType);

  useEffect(() => {
    if (user?.wallets?.length) {
      const cookieWallet = user.wallets.find(
        (w) => w.type === localStorage.getItem("wallet"),
      );
      if (cookieWallet && Math.ceil(cookieWallet.amount) > 0) {
        localStorage.setItem("wallet", cookieWallet.type);
        setWallet(cookieWallet.type as walletType);
      } else {
        const newWallet = user.wallets.sort((a, b) => b.amount - a.amount)[0]
          .type;
        localStorage.setItem("wallet", newWallet);
        setWallet(newWallet as walletType);
      }
    }
  }, [user?.wallets]);

  useEffect(() => {
    if (wallet) localStorage.setItem("wallet", wallet);
  }, [wallet]);

  return { wallet, setWallet };
};
