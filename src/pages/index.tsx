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

const technologiesList = [
  "TypeScript",
  "React",
  "Next.js",
  "Styled Components",
];

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
        throw new Error("Error occured while trying to send email");
      }
      reset();
    } catch (e) {
      return setError("root", {
        type: "server",
        message:
          formTranslation("rootErrors.serverError") ||
          "Message sent successfuly",
      });
    }
  };

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
          <div className="leading-tight">{homeTranslation("hero.slogan")}</div>
          <div className="leading-tight text-indigo-500 dark:text-indigo-400">
            Web developer.
          </div>
        </h1>
        <div className="prose prose-slate max-w-2xl dark:prose-invert sm:prose-xl">
          <Balancer>{homeTranslation("hero.description")}</Balancer>
        </div>
      </section>
      <section id="about" className="mx-auto mt-14 max-w-5xl sm:mt-24 md:mt-40">
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
                  <FiChevronRight className="m-0 stroke-[3] text-indigo-500 dark:text-indigo-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p>{homeTranslation("about.fourthParagraph")}</p>
          </div>
          <div className="relative aspect-square w-3/5 flex-shrink-0 self-center overflow-hidden rounded-full bg-gradient-to-b from-indigo-500 shadow-md sm:w-72 lg:self-start">
            <Image
              alt="Adam Arkuszyński"
              src={MyPicture}
              fill
              sizes={`90vw, ${QUERIES.sm} 50vw, ${QUERIES.lg} 33vw`}
              className="object-cover object-right-bottom"
            />
          </div>
        </div>
      </section>
      <section
        id="projects"
        className="prose prose-slate mx-auto mt-28 max-w-5xl dark:prose-invert md:mt-36 lg:mt-48"
      >
        <h2>{homeTranslation("projects.title")}</h2>
        <Link href="/remax-peak">
          <div className="relative overflow-hidden rounded-md shadow-lg">
            <Image
              src={RemaxImg}
              alt="Zrzut strony głównej remax-peak.pl"
              className="my-0"
            />
          </div>
        </Link>
        <h3>
          <Link href="/remax-peak">RE/MAX Peak</Link>
        </h3>
        <p>{homeTranslation("projects.remaxPeak")}</p>
      </section>
      {/* TODO: localization */}
      <section
        id="contact"
        className="mt-28 w-full sm:mx-auto md:mt-36 lg:mt-48 lg:max-w-2xl"
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
              {errors.email && <InputError>{errors.email?.message}</InputError>}
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
            className="mx-auto block w-full rounded-lg bg-indigo-500 px-3 py-2 font-medium text-slate-200 disabled:bg-gray-500"
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
      </section>
      <div className="h-20" />
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
