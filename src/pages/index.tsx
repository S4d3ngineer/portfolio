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
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "~/components/InputError/InputError";
import { QUERIES } from "~/constants";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { m, MotionConfig, type Variants } from "framer-motion";
import { useState } from "react";

const technologiesList = [
  "TypeScript",
  "React",
  "Next.js",
  "Styled Components",
];

const headingVariants: Variants = {
  visible: { y: 0 },
  hidden: { y: "-100%" },
};

const heroDescriptionVariants: Variants = {
  visible: { y: "0%", opacity: 1 },
  hidden: { y: "20%", opacity: 0 },
};

const socialLinksContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const socialLinksVariants: Variants = {
  visible: { y: "0%", opacity: 1 },
  hidden: { y: "50%", opacity: 0 },
};

const sectionWhileInViewVariants: Variants = {
  visible: {
    y: "0%",
    opacity: 1,
    transition: { y: { ease: "easeInOut" }, opacity: { ease: "easeIn" } },
  },
  hidden: { y: "1rem", opacity: 0 },
};

const sectionTransition = {
  delay: 0.2,
  duration: 0.5,
};

const Home: NextPage = () => {
  const { t: homeTranslation } = useTranslation("home");
  const { t: formTranslation } = useTranslation("contactForm");

  const FormSchema = z.object({
    name: z.string(),
    email: z.string().email({
      message: formTranslation("email.errorMessage") || "Invalid email",
    }),
    message: z
      .string()
      .trim()
      .min(1, {
        message:
          formTranslation("message.errorMessage") || "Message cannot be empty",
      }),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: {
      errors,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      isValid,
    },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const mailData = {
      subject: `Portfiolio contact from ${data.name}`,
      body: `contact email: ${data.email || "brak"} \n\n${data.message}`,
    };

    try {
      const response = await fetch("/api/sendMail/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailData),
      });
      if (!response.ok) {
        throw new Error("Error occurred while trying to send email");
      }
      reset();
    } catch (e) {
      return setError("root", {
        type: "server",
        message:
          formTranslation("rootErrors.serverError") ||
          "Message sent successfully",
      });
    }
  };

  const [showSloganSecondPart, setShowSetSloganSecondPart] = useState(false);
  const [showHeroDescription, setShowHeroDescription] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  return (
    <>
      <Head>
        <title>Adam Arkuszyński</title>
        <meta
          name="description"
          content={homeTranslation("metaDescription") || ""}
        />
      </Head>
      <section
        id="hero"
        className="mx-auto flex h-screen max-w-4xl flex-col items-start justify-center"
      >
        <h1 className="mb-4 text-4xl font-semibold sm:text-6xl lg:text-7xl">
          <MotionConfig reducedMotion="user">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeIn", delay: 0.3 }}
              onAnimationComplete={() => setShowSetSloganSecondPart(true)}
              className="leading-tight"
            >
              {homeTranslation("hero.slogan")}
            </m.div>
            <div className="overflow-hidden">
              <m.div
                initial={false}
                animate={showSloganSecondPart ? "visible" : "hidden"}
                variants={headingVariants}
                transition={{ delay: 0.4 }}
                onAnimationComplete={() => setShowHeroDescription(true)}
                className="leading-tight text-primary dark:text-primary-dark-mode"
              >
                Web developer.
              </m.div>
            </div>
          </MotionConfig>
        </h1>
        <m.div
          initial={false}
          animate={showHeroDescription ? "visible" : "hidden"}
          variants={heroDescriptionVariants}
          onAnimationComplete={() => setShowSocialLinks(true)}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="prose prose-slate max-w-2xl dark:prose-invert sm:prose-xl"
        >
          <Balancer>{homeTranslation("hero.description")}</Balancer>
        </m.div>
        <m.div
          animate={showSocialLinks ? "visible" : "hidden"}
          variants={socialLinksContainerVariants}
          className="mt-4 flex gap-6 text-lg font-medium sm:mt-6 sm:text-xl"
        >
          <m.a
            href="https://github.com/S4d3ngineer"
            target="_blank"
            initial={false}
            variants={socialLinksVariants}
          >
            <div className="flex items-center gap-2">
              <IoLogoGithub />
              <div className="group">
                GitHub
                <div className="h-0.5 w-0 bg-slate-700 transition-all duration-500 group-hover:w-full group-hover:duration-300 dark:bg-slate-300"></div>
              </div>
            </div>
          </m.a>
          {/* TODO: add pl link in the future */}
          <m.a
            href="https://www.linkedin.com/in/adam-arkuszynski/"
            target="_blank"
            initial={false}
            variants={socialLinksVariants}
          >
            <div className="flex items-center gap-2">
              <IoLogoLinkedin />
              <div className="group">
                Linkedin
                <div className="h-0.5 w-0 bg-slate-700 transition-all duration-500 group-hover:w-full group-hover:duration-300 dark:bg-slate-300"></div>
              </div>
            </div>
          </m.a>
        </m.div>
      </section>
      <section id="about" className="mx-auto mt-14 max-w-5xl sm:mt-24 md:mt-40">
        <m.div
          initial="hidden"
          whileInView="visible"
          variants={sectionWhileInViewVariants}
          viewport={{ once: true, amount: 0.3 }}
          transition={sectionTransition}
        >
          <h2 className="mb-6 text-2xl font-bold">
            {homeTranslation("about.title")}
          </h2>
          <div className="flex flex-col gap-16 lg:flex-row">
            <div className="prose prose-slate dark:prose-invert">
              <p>{homeTranslation("about.firstParagraph")}</p>
              <p>{homeTranslation("about.secondParagraph")}</p>
              <p>{homeTranslation("about.thirdParagraph")}</p>
              <ul className="py-4">
                {technologiesList.map((item) => (
                  <li key={item} className="flex items-center gap-1">
                    <FiChevronRight className="m-0 stroke-[3] text-primary dark:text-primary-dark-mode" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>{homeTranslation("about.fourthParagraph")}</p>
            </div>
            <div className="relative aspect-square w-3/5 flex-shrink-0 self-center overflow-hidden rounded-full bg-gradient-to-b from-indigo-500 shadow-md sm:w-72 lg:self-start">
              <Image
                alt={homeTranslation("imgAlt.myPicture")}
                src={MyPicture}
                fill
                sizes={`90vw, ${QUERIES.sm} 50vw, ${QUERIES.lg} 33vw`}
                className="object-cover object-right-bottom"
              />
            </div>
          </div>
        </m.div>
      </section>
      <section
        id="projects"
        className="prose prose-slate mx-auto mt-28 max-w-5xl dark:prose-invert md:mt-36 lg:mt-48"
      >
        <m.div
          initial="hidden"
          whileInView="visible"
          variants={sectionWhileInViewVariants}
          viewport={{ once: true, amount: 0.3 }}
          transition={sectionTransition}
        >
          <h2>{homeTranslation("projects.title")}</h2>
          <Link href="/remax-peak">
            <div className="relative overflow-hidden rounded-md shadow-lg">
              <Image
                src={RemaxImg}
                alt={homeTranslation("imgAlt.remaxImg")}
                className="my-0"
              />
            </div>
          </Link>
          <h3>
            <Link href="/remax-peak" className="font-semibold">
              RE/MAX Peak
            </Link>
          </h3>
          <p>{homeTranslation("projects.remaxPeak")}</p>
        </m.div>
      </section>
      <section
        id="contact"
        className="mt-28 w-full sm:mx-auto md:mt-36 lg:mt-48 lg:max-w-2xl"
      >
        <m.div
          initial="hidden"
          whileInView="visible"
          variants={sectionWhileInViewVariants}
          viewport={{ once: true, amount: 0.3 }}
          transition={sectionTransition}
        >
          <h2 className="mb-6 text-2xl font-bold lg:mb-12 lg:text-center lg:text-4xl">
            {homeTranslation("contact.title")}
          </h2>
          <form
            className="space-y-6"
            action="https://formsubmit.co/0eace010ac3e7ca415b7d215a2fbea69"
            method="POST"
            noValidate
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
              <div className="w-full sm:w-1/2">
                <label htmlFor="name" className="font-medium">
                  {formTranslation("name.name")}
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  disabled={isSubmitting || isSubmitSuccessful}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label htmlFor="email" className="font-medium">
                  {formTranslation("email.name")}
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  disabled={isSubmitting || isSubmitSuccessful}
                />
                {errors.email && (
                  <InputError>{errors.email?.message}</InputError>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="font-medium">
                {formTranslation("message.name")}
              </label>
              <textarea
                id="message"
                rows={9}
                {...register("message")}
                disabled={isSubmitting || isSubmitSuccessful}
                className="resize-none"
              />
              {errors.message && (
                <InputError>{errors.message.message}</InputError>
              )}
            </div>
            <button
              disabled={
                isSubmitting ||
                (isSubmitted && !isValid && !isSubmitSuccessful) ||
                isSubmitSuccessful
              }
              className="mx-auto block w-full rounded-lg bg-primary px-3 py-2 font-medium text-white disabled:bg-gray-500 dark:bg-indigo-500 dark:disabled:bg-gray-500"
            >
              {isSubmitting
                ? formTranslation("submitButton.submittingMessage")
                : formTranslation("submitButton.submitMessage")}
            </button>
            {errors.root && <InputError>{errors.root.message}</InputError>}
            {isSubmitSuccessful && (
              <p className="mx-auto w-fit font-medium text-green-600 sm:text-xl">
                {formTranslation("successMessage")}
              </p>
            )}
          </form>
        </m.div>
      </section>
      <div className="h-32" />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ["home", "contactForm"],
      nextI18nConfig,
      ["en", "pl"]
    )),
  },
});

export default Home;
