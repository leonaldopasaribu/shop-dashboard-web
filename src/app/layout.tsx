/* eslint-disable @next/next/no-sync-scripts */
import { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";

import "./globals.css";

import { SIDEBAR_MENU } from "@/shared/constants/menu.constant";
import { Providers } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Shop",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          {" "}
          <main>
            <button
              data-drawer-target="separator-sidebar"
              data-drawer-show="separator-sidebar"
              aria-controls="separator-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>

            <aside
              id="separator-sidebar"
              className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
              aria-label="Sidebar"
            >
              <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200">
                <ul className="space-y-2 font-medium">
                  {SIDEBAR_MENU.map((data, id) => (
                    <li key={id}>
                      <a
                        href="#"
                        className="flex items-center p-2 text-black transition duration-75 rounded-lg hover:bg-gray-100 group"
                      >
                        <Image
                          src={data.image}
                          width={20}
                          height={20}
                          alt={data.alt}
                        ></Image>
                        <span className="ml-3">{data.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="p-4 sm:ml-64">
              <div className="p-4 rounded-lg bg-white">
                <div className="grid mb-4 ">{children}</div>
              </div>
            </div>
          </main>
          <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
        </body>
      </html>
    </Providers>
  );
}
