import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function getServerSideData(
  translationNamespace = [] as string[],
) {
  return async function getServerSideProps(context: any) {
    const { locale } = context;
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          ...translationNamespace,
          "menu",
          "common",
          "pages",
          "footer",
          "modals",
        ])),
      },
    };
  };
}
