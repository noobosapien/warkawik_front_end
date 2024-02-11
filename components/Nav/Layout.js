import React, { useContext, useState } from "react";
import ToggleDark from "./ChangeDark";
import { Theme } from "@/utils/Theme";
import Link from "next/link";
import FB from "@/public/fb.svg";
import X from "@/public/x.svg";
import LI from "@/public/li.svg";

export default function Layout({ active, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { state, dispatch } = useContext(Theme);

  const openMenu = (e) => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={`${state?.darkMode?.dark ? "dark" : ""} scroll-smooth`}>
        <div className="dark:bg-slate-900 text-slate-600 dark:text-slate-200 min-h-screen flex justify-center">
          <div className="max-w-[1200px] w-full">
            <nav className="relative container mx-auto p-6 ">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                  <Link href="/">
                    <h1>
                      <span className="font-bold text-slate-600 dark:text-slate-200 text-3xl lg:text-5xl">
                        Warka
                      </span>{" "}
                      <span className="font-thin text-slate-600 dark:text-slate-200 text-3xl lg:text-5xl">
                        wik
                      </span>
                    </h1>
                  </Link>
                </div>

                <div className="flex items-center space-x-6 font-bold text-slate-600">
                  <div className="flex space-x-8 font-bold items-center">
                    <ToggleDark />
                  </div>
                </div>
              </div>
            </nav>

            {children}

            <footer className="min-h-48 flex items-center justify-center">
              Warkawik
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
