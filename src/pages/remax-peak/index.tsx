import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "next-i18next.config.mjs";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import RemaxImg from "public/remax-screenshot.png";
import RemaxConsentImg from "public/remax-consent.png";
import RemaxOffersImg from "public/remax-offers.png";
import { FiChevronRight } from "react-icons/fi";

const stackList = [
  "TypeScript",
  "Next.js",
  "Strapi",
  "Prisma",
  "Styled Components",
];

export default function RemaxPeak() {
  const { t: commonTranslation } = useTranslation("common");
  const { t: projectTranslation } = useTranslation("project.remaxPeak");

  return (
    <>
      <Head>
        <title>{projectTranslation("metaTitle")}</title>
        <meta
          name="description"
          content={projectTranslation("metaDescription") || ""}
        />
      </Head>
      <div className="mx-auto mt-48 max-w-5xl">
        <div className="mb-16">
          <div className="prose prose-slate mx-auto w-fit dark:prose-invert">
            <h1>RE/MAX Peak</h1>
            <p>{projectTranslation("introduction.firstParagraph")}</p>
            <h2 className="mb-2 text-xl">
              {projectTranslation("introduction.roleHeading")}
            </h2>
            <p>{projectTranslation("introduction.role")}</p>
            <h2 className="mb-2 text-xl">{projectTranslation("stack")}</h2>
            <ul className="mb-8 pl-0">
              {stackList.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1 sm:inline-flex"
                >
                  <FiChevronRight className="m-0 stroke-[4] text-primary dark:text-primary-dark-mode" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://remax-peak.pl/"
              target="_blank"
              className="mb-16 mt-8 block font-semibold text-primary dark:text-primary-dark-mode sm:text-xl"
            >
              {commonTranslation("goToSite")}
            </a>
          </div>
          <div className="relative overflow-hidden rounded-md shadow-lg">
            <Image
              src={RemaxImg}
              alt={projectTranslation("imgAlt.remaxImg")}
              priority
            />
          </div>
        </div>
        <div className="mb-16">
          <div className="prose prose-slate mx-auto mb-8 dark:prose-invert">
            <h2>{projectTranslation("goal.heading")}</h2>
            <p>{projectTranslation("goal.firstParagraph")}</p>
            <p>{projectTranslation("goal.secondParagraph")}</p>
          </div>
          <div className="relative overflow-hidden rounded-md shadow-lg">
            <Image
              src={RemaxOffersImg}
              alt={projectTranslation("imgAlt.remaxOffersImg")}
            />
          </div>
        </div>
        <div id="features" className="mb-16">
          <div className="prose prose-slate mx-auto dark:prose-invert">
            <h2>{projectTranslation("features.heading")}</h2>
            <p>{projectTranslation("features.firstParagraph")}</p>
            <p>{projectTranslation("features.secondParagraph")}</p>
          </div>
          <div className="relative mt-8 overflow-hidden rounded-md shadow-lg">
            <Image
              src={RemaxConsentImg}
              alt={projectTranslation("imgAlt.remaxConsentImg")}
            />
          </div>
        </div>
        <div className="prose prose-slate mx-auto mb-16 dark:prose-invert">
          <h2>{projectTranslation("problems.heading")}</h2>
          <p>{projectTranslation("problems.firstParagraph")}</p>
          <p>{projectTranslation("problems.secondParagraph")}</p>
          <p>{projectTranslation("problems.thirdParagraph")}</p>

          <h2>{projectTranslation("lessons.heading")}</h2>
          <p>{projectTranslation("lessons.firstParagraph")}</p>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ["common", "project.remaxPeak"],
      nextI18nConfig,
      ["en", "pl"]
    )),
  },
});
