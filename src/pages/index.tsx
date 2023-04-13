import { type NextPage } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import nextI18nConfig from "../../next-i18next.config.mjs";
import Balancer from "react-wrap-balancer";
import myPicture from "public/my-picture.png";
import Image from "next/image.js";
import { FiChevronRight } from "react-icons/fi";

const technologiesList = [
  "TypeScript",
  "React",
  "Next.js",
  "Styled Components",
];

const Home: NextPage = () => {
  const { t: heroTranslation } = useTranslation("homepage.hero");
  const { t: aboutTranslation } = useTranslation("homepage.about");

  return (
    <>
      <Head>
        <title>Adam Arkuszyński</title>
        {/* TODO: localize description */}
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <section
        id="hero"
        className="mx-auto flex h-screen max-w-4xl flex-col items-start justify-center"
      >
        <h1 className="mb-4 text-4xl font-semibold sm:text-6xl lg:text-7xl">
          <div className="leading-tight">{heroTranslation("slogan")}</div>
          <div className="leading-tight text-indigo-500 dark:text-indigo-400">
            Web developer.
          </div>
        </h1>
        <div className="max-w-2xl sm:text-xl">
          <Balancer>{heroTranslation("description")}</Balancer>
        </div>
      </section>
      <section
        id="about"
        className="mx-auto max-w-5xl py-14 sm:py-20 md:py-24 "
      >
        <h2 className="mb-10 text-3xl font-semibold sm:text-4xl">
          {aboutTranslation("title")}
        </h2>
        <div className="flex flex-col gap-16 lg:flex-row ">
          <div className="space-y-4 lg:col-span-2">
            <p>{aboutTranslation("firstParagraph")}</p>
            <p>{aboutTranslation("secondParagraph")}</p>
            <p>{aboutTranslation("thirdParagraph")}</p>
            <ul className="space-y-1 py-4">
              {technologiesList.map((item) => (
                <li key={item} className="flex items-center gap-1">
                  <FiChevronRight className="stroke-[3] text-indigo-500 dark:text-indigo-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p>{aboutTranslation("fourthParagraph")}</p>
          </div>
          <div className="relative aspect-square w-4/5 flex-shrink-0 self-center overflow-hidden rounded-full bg-gradient-to-b from-indigo-500 shadow-inner  sm:w-72 lg:self-start">
            <Image
              alt="Adam Arkuszyński"
              src={myPicture}
              fill
              className="object-cover object-right-bottom"
            />
          </div>
        </div>
      </section>
      <section id="work"></section>
      <section id="contact"></section>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ["homepage", "homepage.hero", "homepage.about"],
      nextI18nConfig,
      ["en", "pl"]
    )),
  },
});

export default Home;
