import { useTranslation } from "next-i18next";

const EmailVerifModalDescription = ({ email }: { email?: string | null }) => {
  const { t } = useTranslation("modals");
  return email ? (
    <>
      <div className="mt-2">
        {t("modal.email.verif.send")}
        <span className="text-white underline">{email}</span>
      </div>
      <div>{t("modal.email.verif.required.verif")}</div>
    </>
  ) : (
    <>
      <div className="mt-4">
        {t("modal.email.verif.required.put")}
        <span className="text-white underline">{email}</span>
      </div>
      <div>{t("modal.email.verif.will.send")}</div>
    </>
  );
};

export default EmailVerifModalDescription;
