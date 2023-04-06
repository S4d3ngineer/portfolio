import { type NextPage } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import nextI18nConfig from "../../next-i18next.config.mjs";

const Home: NextPage = () => {
  const { t } = useTranslation("homepage");

  return (
    <>
      <Head>
        <title>Adam Arkuszyński</title>
        {/* TODO: localize description */}
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <h1 className="text-5xl">{t("hello world")}</h1>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["homepage"], nextI18nConfig, [
      "en",
      "pl",
    ])),
  },
});

export default Home;
