import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { Separator } from "@/components/ui/separator";
import Providers from "./providers";
import Header from "./header";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import ForgotForm from "./forgotForm";
import ResetPassword from "./resetPassword";
import { useTranslation } from "next-i18next";

const LoginModal = () => {
  const { loginModal, closeLoginModal, openLoginModal } = useUser();
  const { t } = useTranslation(["modals", "common"]);
  return (
    <div>
      <Dialog
        open={
          loginModal === "login" ||
          loginModal === "register" ||
          loginModal === "forgotPassword" ||
          loginModal === "resetPassword"
        }
        onOpenChange={(opened) => !opened && closeLoginModal()}
      >
        <DialogContent className="overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              <Header />
            </DialogTitle>
            <DialogDescription>
              {loginModal === "login" && (
                <LoginForm
                  forgotPassword={() => {
                    openLoginModal("forgotPassword");
                  }}
                />
              )}
              {loginModal === "register" && <RegisterForm />}
              {loginModal === "forgotPassword" && <ForgotForm />}
              {loginModal === "resetPassword" && <ResetPassword />}
              <div className="text-center py-2">
                {loginModal === "login" && t("modal.login.no.account")}
                {loginModal === "register" &&
                  t("modal.register.already.account")}
                {(loginModal === "forgotPassword" ||
                  loginModal === "resetPassword") &&
                  t("modal.reset.already.account")}
                <span
                  className="hover:underline hover:cursor-pointer hover:text-white"
                  onClick={() => {
                    openLoginModal(
                      loginModal === "login" ? "register" : "login",
                    );
                  }}
                >
                  {loginModal === "login"
                    ? t("modal.register.button")
                    : t("modal.login.button")}
                </span>
              </div>
              {loginModal !== "forgotPassword" &&
                loginModal !== "resetPassword" && (
                  <>
                    <div className="flex items-center">
                      <div className="w-3/6">
                        <Separator />
                      </div>
                      <div className="text-white">
                        {t("ok", { nx: "common" })}
                      </div>
                      <div className="w-3/6">
                        <Separator />
                      </div>
                    </div>
                    <Providers />
                  </>
                )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
