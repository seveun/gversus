import { createContext, ReactNode, useState, useEffect, useRef } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { ref, onChildChanged, off } from "firebase/database";
import { auth, database } from "@/firebase";
import { useQuery, useQueryClient } from "react-query";
import * as UserService from "@/services/user.service";
import { useWallet } from "@/hooks/useWallet";
import User from "@/types/User";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
interface UserContextProps {
  user: User | null;
  loginModal: string | boolean;
  openLoginModal: (modalType?: string) => void;
  closeLoginModal: () => void;
  openVerifMailModal: () => void;
  closeVerifMailModal: () => void;
  openTwoFactorModal: () => void;
  closeTwoFactorModal: () => void;
  setWallet: (wallet: "EUR" | "USD" | "BTC" | "ETH" | "LTC" | "USDT") => void;
  setUsername: (username: string) => void;
  verifMailOpened: boolean;
  isLoading: boolean;
  verifTwoFactorOpened: boolean;
  setIsLoading: (loading: boolean) => void;
  resetPasswordCode: string | null;
  wallet: string | null;
  vipModalOpened: boolean;
  openVipModal: () => void;
  closeVipModal: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const firebaseUserRef = useRef<FirebaseUser | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [verifMailOpened, setVerifMailOpened] = useState<boolean>(false);
  const [verifTwoFactorOpened, setVerifTwoFactorOpened] =
    useState<boolean>(false);
  const [vipModalOpened, setVipModalOpened] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const searchParams = useSearchParams();
  const resetPasswordCode = searchParams.get("resetPassword");
  const authRequired = searchParams.get("auth");

  const { data: user } = useQuery(
    "user",
    async () => {
      if (firebaseUserRef.current) {
        setIsLoading(true);
        const accessToken = await firebaseUserRef.current.getIdToken();
        try {
          const sessionId = localStorage.getItem("sessionId") || undefined;
          const tempUser = await UserService.get(accessToken, {
            sessionId,
            username,
            affiliateCode:
              localStorage.getItem("referral_code") ||
              Cookies.get("referral_code") ||
              null,
          });
          tempUser.firebase = firebaseUserRef.current;
          if (verifMailOpened) closeVerifMailModal();
          if (verifTwoFactorOpened) closeTwoFactorModal();
          if (vipModalOpened) closeVipModal();
          if (sessionId !== tempUser.sessionId) {
            localStorage.setItem("sessionId", tempUser.sessionId);
          }
          setIsLoading(false);
          return tempUser;
        } catch (error: any) {
          const emailIsNotVerified =
            error?.response?.data?.error === "Email is not verified";
          const twoFactorIsEnabled =
            error?.response?.data?.error === "Two factor is enabled";
          const sessionDisabled =
            error?.response?.data?.error === "Session disabled";
          if (sessionDisabled) auth.signOut();
          if (emailIsNotVerified || twoFactorIsEnabled) {
            if (emailIsNotVerified) setVerifMailOpened(true);
            if (twoFactorIsEnabled) setVerifTwoFactorOpened(true);
            const tempUser = error?.response?.data?.user;
            tempUser.firebase = firebaseUserRef.current;
            return tempUser;
          }
        }
        closeLoginModal();
        setIsLoading(false);
      }
      if (firebaseUserRef.current === null) return null;
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  ) as { data: User };

  const { wallet, setWallet } = useWallet(user);
  const [loginModal, setLoginModal] = useState(false as string | boolean);
  const openLoginModal = (modalType?: string) =>
    setLoginModal(modalType !== undefined ? modalType : true);
  const closeLoginModal = () => setLoginModal(false);
  const openVerifMailModal = () => setVerifMailOpened(true);
  const closeVerifMailModal = () => setVerifMailOpened(false);
  const closeTwoFactorModal = () => setVerifTwoFactorOpened(false);
  const openTwoFactorModal = () => setVerifTwoFactorOpened(true);
  const openVipModal = () => setVipModalOpened(true);
  const closeVipModal = () => setVipModalOpened(false);

  const refreshUser = async () => {
    if (firebaseUserRef.current) {
      await queryClient.fetchQuery("user");
    }
  };

  useEffect(() => {
    if (resetPasswordCode && !isLoading) openLoginModal("resetPassword");
  }, [resetPasswordCode, isLoading]);

  useEffect(() => {
    if (authRequired && !isLoading && !user) {
      router.push("/");
      openLoginModal("login");
    }
  }, [authRequired, isLoading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) setIsLoading(false);
      firebaseUserRef.current = currentUser;
      if (currentUser) refreshUser();
      else queryClient.setQueryData("user", null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `user/${user.id}`);
      onChildChanged(userRef, () => refreshUser());
      closeLoginModal();
      return () => off(userRef);
    } else {
      closeTwoFactorModal();
      closeVerifMailModal();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        openLoginModal,
        closeLoginModal,
        loginModal,
        setIsLoading,
        wallet,
        setWallet,
        setUsername,
        verifMailOpened,
        openVerifMailModal,
        closeVerifMailModal,
        verifTwoFactorOpened,
        closeTwoFactorModal,
        openTwoFactorModal,
        resetPasswordCode,
        vipModalOpened,
        openVipModal,
        closeVipModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
