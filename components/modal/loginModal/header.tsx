import UserCircleIcon from "@/components/ui/icons/userCircleIcon";
import { useUser } from "@/hooks/useUser";
import { useTranslation } from "next-i18next";

const LoginModalHeader = () => {
  const { t } = useTranslation("modals");
  const { loginModal } = useUser();
  return (
    <>
      <div className="h-20 relative">
        <div className="absolute w-full flex justify-center -mt-28">
          <div className="login-modal-header w-full h-3/6 absolute -z-10" />
          <UserCircleIcon />
        </div>
      </div>
      <div className="flex-col w-full text-center">
        <div className="text-xl">
          {loginModal === "login" && t("modal.login.header.title")}
          {loginModal === "register" && t("modal.register.header.title")}
          {loginModal === "forgotPassword" &&
            t("modal.register.header.forgotPassword")}
          {loginModal === "resetPassword" &&
            t("modal.register.header.resetPassword")}
        </div>
        <div className="opacity-60 text-base">
          {loginModal === "login" && t("modal.register.header.login.subtitle")}
          {loginModal === "register" &&
            t("modal.register.header.register.subtitle")}
          {loginModal === "forgotPassword" &&
            t("modal.register.header.forgotPassword.subtitle")}
          {loginModal === "resetPassword" &&
            t("modal.register.header.resetPassword.subtitle")}
        </div>
      </div>
    </>
  );
};

export default LoginModalHeader;
