import { appWithTranslation } from "next-i18next";
import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "~/components/Layout";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import { LazyMotion } from "framer-motion";

import "~/styles/globals.css";

const loadFeatures = () =>
  import("~/helpers/animation.features").then((res) => res.default);

const satoshi = localFont({
  src: "../../public/Satoshi_Complete/Fonts/Variable/Satoshi-Variable.ttf",
});

const generalSans = localFont({
  src: "../../public/GeneralSans_Complete/Fonts/Variable/GeneralSans-Variable.ttf",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <LazyMotion features={loadFeatures}>
        <Layout>
          <style jsx global>{`
            html {
              font-family: ${generalSans.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
        </Layout>
      </LazyMotion>
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
