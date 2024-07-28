import getServerSideData from "@/hoc/getServerSideData";
import Layout from "@/components/layout";
import Container from "@/components/ui/container";
// import { useTranslation } from "next-i18next";

export const getStaticProps = getServerSideData();

const IndexPage = () => {
  // const { t } = useTranslation(["common", "pages"]);
  return (
    <div className="flex">
      <Layout footerClassName="bg-secondary" socials>
        <Container>deploy</Container>
      </Layout>
    </div>
  );
};

export default IndexPage;
