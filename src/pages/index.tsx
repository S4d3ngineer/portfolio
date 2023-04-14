import { type NextPage } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import nextI18nConfig from "next-i18next.config.mjs";
import Balancer from "react-wrap-balancer";
import Image from "next/image.js";
import MyPicture from "public/my-picture.png";
import RemaxImg from "public/remax-screenshot.png";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const technologiesList = [
  "TypeScript",
  "React",
  "Next.js",
  "Styled Components",
];

const Home: NextPage = () => {
  const { t: homeTranslation } = useTranslation("home");

  return (
    <>
      <Head>
        <title>Adam Arkuszyński</title>
        <meta
          name="description"
          content={homeTranslation("metaDescription") || ""}
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <section
        id="hero"
        className="mx-auto flex h-screen max-w-4xl flex-col items-start justify-center"
      >
        <h1 className="mb-4 text-4xl font-semibold sm:text-6xl lg:text-7xl">
          <div className="leading-tight">{homeTranslation("hero.slogan")}</div>
          <div className="leading-tight text-indigo-500 dark:text-indigo-400">
            Web developer.
          </div>
        </h1>
        <div className="max-w-2xl sm:text-xl">
          <Balancer>{homeTranslation("hero.description")}</Balancer>
        </div>
      </section>
      <section
        id="about"
        className="mx-auto my-14 max-w-5xl sm:py-20 md:py-24 "
      >
        <h2 className="mb-10 text-3xl font-semibold sm:text-4xl">
          {homeTranslation("about.title")}
        </h2>
        <div className="flex flex-col gap-16 lg:flex-row ">
          <div className="space-y-4 lg:col-span-2">
            <p>{homeTranslation("about.firstParagraph")}</p>
            <p>{homeTranslation("about.secondParagraph")}</p>
            <p>{homeTranslation("about.thirdParagraph")}</p>
            <ul className="space-y-1 py-4">
              {technologiesList.map((item) => (
                <li key={item} className="flex items-center gap-1">
                  <FiChevronRight className="stroke-[3] text-indigo-500 dark:text-indigo-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p>{homeTranslation("about.fourthParagraph")}</p>
          </div>
          <div className="relative aspect-square w-4/5 flex-shrink-0 self-center overflow-hidden rounded-full bg-gradient-to-b from-indigo-500 shadow-md sm:w-72 lg:self-start">
            <Image
              alt="Adam Arkuszyński"
              src={MyPicture}
              fill
              className="object-cover object-right-bottom"
            />
          </div>
        </div>
      </section>
      <section
        id="projects"
        className="mx-auto my-14 max-w-5xl sm:py-20 md:py-24 "
      >
        <h2 className="mb-10 text-3xl font-semibold sm:text-4xl">
          {homeTranslation("projects.title")}
        </h2>
        <ul>
          <li className="">
            <Link href="/remax-peak">
              <div className="relative overflow-hidden rounded-md shadow-lg">
                <Image
                  src={RemaxImg}
                  alt="Zrzut strony głównej remax-peak.pl"
                />
              </div>
            </Link>
            <h3 className="mb-4 mt-8 text-xl font-semibold sm:text-2xl">
              <Link href="/remax-peak">RE/MAX Peak</Link>
            </h3>
            <p>{homeTranslation("projects.remaxPeak")}</p>
          </li>
        </ul>
      </section>
      <section id="contact"></section>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ["home", "homepage.about", "homepage.projects"],
      nextI18nConfig,
      ["en", "pl"]
    )),
  },
});

export default Home;
