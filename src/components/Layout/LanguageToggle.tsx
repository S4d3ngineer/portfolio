import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MotionConfig, m } from "framer-motion";

export default function LanguageToggle() {
  const router = useRouter();
  const routerRef = useRef(router);
  const [currentLocale, setCurrentLocale] = useState(router.locale);

  useEffect(() => {
    if (currentLocale) {
      void routerRef.current.push(routerRef.current.pathname, undefined, {
        locale: currentLocale,
      });
    }
  }, [currentLocale, routerRef]);

  const changeLanguageText = {
    pl: "Change site language to english",
    en: "Zmień język strony na polski",
  };

  return (
    <>
      <div
        className="flow-hidden space-x-0.5 rounded-lg border-[1px] border-gray-500 bg-slate-700 p-0.5 text-base font-semibold text-slate-100 transition-colors dark:bg-slate-800"
        role="group"
      >
        {router.locales?.map((locale) => (
          <button
            key={locale}
            onClick={() => {
              setCurrentLocale(locale);
            }}
            className="relative px-3 py-1 outline-[3px] outline-offset-4 outline-black focus-visible:outline dark:outline-white"
          >
            <MotionConfig reducedMotion="user">
              {currentLocale === locale && (
                <m.div
                  layoutId="background"
                  transition={{ ease: "backInOut", duration: 0.2 }}
                  className="absolute inset-0 rounded-md bg-indigo-500"
                />
              )}
            </MotionConfig>
            <span aria-hidden="true" className="relative">
              {locale}
            </span>
            <span className="sr-only">
              {changeLanguageText.hasOwnProperty(locale)
                ? changeLanguageText[locale as keyof typeof changeLanguageText]
                : "Change language"}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
