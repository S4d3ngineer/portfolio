import { appWithTranslation } from "next-i18next";
import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "~/components/layout";
import { ThemeProvider } from "next-themes";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
