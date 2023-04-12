import Link from "next/link";
import { useState, type ReactNode, useEffect } from "react";
// import { GitHub, Linkedin } from "react-icons/fi";
import { IoLogoGithub, IoLogoLinkedin, IoMoonSharp } from "react-icons/io5";
import { TbSunFilled } from "react-icons/tb";
import { useTheme } from "next-themes";
import { MotionConfig, AnimatePresence, LazyMotion, m } from "framer-motion";
import { useRouter } from "next/router";

const loadFeatures = () =>
  import("~/helpers/animation.features").then((res) => res.default);

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const router = useRouter();

  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex min-h-full flex-col justify-between">
      <header className="mx-auto flex w-full max-w-7xl items-baseline justify-between px-4 py-4 sm:px-8">
        <div className="text-3xl font-semibold">
          <span className="text-indigo-500 dark:text-indigo-400">A</span>
          <span className="relative right-1">Arkuszyński</span>
        </div>
        <div className="flex items-center gap-2 space-x-1 text-2xl">
          {isMounted && (
            <AnimatePresence>
              {resolvedTheme === "dark" && (
                <MotionConfig reducedMotion="user">
                  <LazyMotion features={loadFeatures}>
                    <m.button
                      // TODO: add this classes bases on variant to parent div
                      className="text-slate-400 transition-colors hover:text-slate-200"
                      onClick={() => setTheme("light")}
                      key="dark"
                      initial={{ opacity: 0, rotate: 240 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -240 }}
                    >
                      <IoMoonSharp />
                    </m.button>
                  </LazyMotion>
                </MotionConfig>
              )}
              {resolvedTheme === "light" && (
                <MotionConfig reducedMotion="user">
                  <LazyMotion features={loadFeatures}>
                    <m.button
                      className="text-slate-600 transition-colors hover:text-slate-800"
                      onClick={() => setTheme("dark")}
                      key="light"
                      initial={{ opacity: 0, rotate: -240 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 240 }}
                    >
                      <TbSunFilled />
                    </m.button>
                  </LazyMotion>
                </MotionConfig>
              )}
            </AnimatePresence>
          )}
          <div className="space-x-1">
            {router.locales?.map((locale) => (
              <button
                key={locale}
                onClick={() => {
                  void router.push(router.pathname, undefined, { locale });
                }}
              >
                {locale}
              </button>
            ))}
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="mx-auto my-8 flex max-w-7xl items-center justify-center gap-4">
        <Link href="https://github.com/S4d3ngineer" target="_blank">
          <IoLogoGithub size={32} />
        </Link>
        {/* TODO: add pl link in the future */}
        <Link
          href="https://www.linkedin.com/in/adam-arkuszynski/"
          target="_blank"
        >
          <IoLogoLinkedin size={32} />
        </Link>
        {/* TODO: decide what to do with icons */}
        {/* <GitHub /> */}
        {/* <Linkedin /> */}
      </footer>
    </div>
  );
}
