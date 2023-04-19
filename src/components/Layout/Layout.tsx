import Link from "next/link";
import { useState, type ReactNode, useEffect } from "react";
// import { GitHub, Linkedin } from "react-icons/fi";
import { IoLogoGithub, IoLogoLinkedin, IoMoonSharp } from "react-icons/io5";
import { TbSunFilled } from "react-icons/tb";
import { useTheme } from "next-themes";
import { MotionConfig, AnimatePresence, m } from "framer-motion";
import LanguageToggle from "./LanguageToggle";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex min-h-full flex-col justify-between">
      <header className="absolute left-0 right-0 top-0 mx-auto flex w-full max-w-7xl items-baseline justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-[26px] font-semibold sm:text-[30px]">
          <span className="text-indigo-500 dark:text-indigo-400">A</span>
          <span className="relative right-1">Arkuszyński</span>
        </Link>
        <div className="flex items-center gap-3 text-[22px] sm:gap-3.5 sm:text-[24px]">
          {isMounted && (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <AnimatePresence>
                {resolvedTheme === "dark" && (
                  <MotionConfig reducedMotion="user">
                    <m.div
                      className="text-slate-400 transition-colors hover:text-slate-200"
                      key="dark"
                      initial={{ opacity: 0, rotate: 240 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -240 }}
                    >
                      <IoMoonSharp />
                    </m.div>
                  </MotionConfig>
                )}
                {resolvedTheme === "light" && (
                  <MotionConfig reducedMotion="user">
                    <m.div
                      className="text-slate-600 transition-colors hover:text-slate-800"
                      key="light"
                      initial={{ opacity: 0, rotate: -240 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 240 }}
                    >
                      <TbSunFilled />
                    </m.div>
                  </MotionConfig>
                )}
              </AnimatePresence>
            </button>
          )}
          <LanguageToggle />
        </div>
      </header>
      <main className="flex-grow px-8">{children}</main>
      <footer className="mx-auto my-8 flex max-w-7xl items-center justify-center gap-4">
        <a href="https://github.com/S4d3ngineer" target="_blank">
          <IoLogoGithub size={32} />
        </a>
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
