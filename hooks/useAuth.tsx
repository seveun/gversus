import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup as signInWithGooglePopup,
  FacebookAuthProvider,
  signInWithPopup as signInWithFacebookPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useUser } from "./useUser";
import { useState, useEffect } from "react";
import * as AuthService from "@/services/auth.service";
import { useTranslation } from "next-i18next";

export const useAuth = () => {
  const { user, setUsername } = useUser();
  const [windowId, setWindowId] = useState<Window | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (windowId) {
      windowId.close();
      setWindowId(null);
    }
  }, [user]);

  const handleLogout = async () => {
    if (user) {
      try {
        const accessToken = await user.firebase.getIdToken();
        AuthService.logout(accessToken);
        await auth.signOut();
      } catch (error) {
        console.error("Erreur lors de la déconnexion: ", error);
      }
    }
  };

  const updateVerifMail = async (email?: string) => {
    if (user) {
      const accessToken = await user.firebase.getIdToken();
      await AuthService.updateVerifMail(accessToken, i18n.language, email);
    }
  };

  const sendTwoFactorAuth = async () => {
    if (user) {
      const accessToken = await user.firebase.getIdToken();
      await AuthService.sendTwoFactorAuth(accessToken, i18n.language);
    }
  };

  const validateTwoFactorAuth = async (code: string) => {
    if (user) {
      const accessToken = await user.firebase.getIdToken();
      await AuthService.validateTwoFactorAuth(accessToken, code);
    }
  };

  const sendSms = async () => {
    if (user) {
      const accessToken = await user.firebase.getIdToken();
      await AuthService.sendSms(accessToken, i18n.language);
    }
  };

  const validateSms = async (code: string) => {
    if (user) {
      const accessToken = await user.firebase.getIdToken();
      await AuthService.validateSms(accessToken, code, i18n.language);
    }
  };

  const handleRegister = async (
    email: string,
    username: string,
    password: string,
  ) => {
    setUsername(username);
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    try {
      await signInWithGooglePopup(auth, provider);
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google: ", error);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    try {
      await signInWithFacebookPopup(auth, provider);
    } catch (error) {
      console.error("Erreur lors de la connexion avec Facebook: ", error);
    }
  };

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    if (user) {
      const token = await user.firebase.getIdToken();
      await AuthService.updatePassword(token, currentPassword, newPassword);
    }
  };

  const getOtpAuth = async () => {
    if (user) {
      const accessToken = await user.firebase.getIdToken();
      const otpAuth = await AuthService.getOtpAuth(accessToken, i18n.language);
      return otpAuth;
    }
  };

  const valideOtpAuth = async (code: string) => {
    if (user) {
      const accessToken = await user.firebase.getIdToken();
      await AuthService.validateOtpAuth(accessToken, code);
    }
  };

  const activateTwoFactorAuth = async (type: string, activate: boolean) => {
    if (user) {
      const accessToken = await user.firebase.getIdToken();
      await AuthService.activateTwoFactorAuth(accessToken, type, activate);
    }
  };

  return {
    handleChangePassword,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    handleFacebookLogin,
    handleLogout,
    updateVerifMail,
    sendTwoFactorAuth,
    validateTwoFactorAuth,
    activateTwoFactorAuth,
    sendSms,
    validateSms,
    getOtpAuth,
    valideOtpAuth,
  };
};
