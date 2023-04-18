import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";

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
    en: "Zmień język storny na polski",
  };

  return (
    <>
      <div className="text-lg" role="group">
        {router.locales?.map((locale) => (
          <button
            key={locale}
            onClick={() => {
              setCurrentLocale(locale);
            }}
            className={clsx("rounded-lg px-2 py-1 font-medium sm:px-3", {
              "bg-indigo-500 text-white transition-colors":
                currentLocale === locale,
            })}
          >
            <span className="sr-only">
              {changeLanguageText.hasOwnProperty(locale)
                ? changeLanguageText[locale as keyof typeof changeLanguageText]
                : "Change language"}
            </span>
            {locale}
          </button>
        ))}
      </div>
    </>
  );
}
