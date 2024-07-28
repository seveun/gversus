import Layout from "@/components/layout";
import getServerSideData from "@/hoc/getServerSideData";
import Image from "next/image";

export const getStaticProps = getServerSideData();

const NotFoundPage = () => {
  return (
    <Layout footerClassName="mt-2">
      <div
        className="relative flex w-full h-[50vh] max-md:h-[35vh] justify-center border-divider"
        style={{
          background:
            "linear-gradient(90deg, #191A1C 0%, rgba(25, 26, 28, 0) 50%",
        }}
      >
        <Image src="/images/404.svg" width={300} height={200} alt="404" />
      </div>
    </Layout>
  );
};

export default NotFoundPage;
