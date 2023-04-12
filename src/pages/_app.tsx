import { appWithTranslation } from "next-i18next";
import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "~/components/Layout";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

import "~/styles/globals.css";

const satoshi = localFont({
  src: "../../public/Satoshi_Complete/Fonts/Variable/Satoshi-Variable.ttf",
});

const generalSans = localFont({
  src: "../../public/GeneralSans_Complete/Fonts/Variable/GeneralSans-Variable.ttf",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <style jsx global>{`
          html {
            font-family: ${generalSans.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
