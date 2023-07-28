import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Providers } from "@/providers";

import { Sidebar } from "@/shared/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Shop",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <main>
            <Sidebar />

            <div className="p-4 sm:ml-64">
              <div className="p-4 rounded-lg bg-white">
                <div className="grid mb-4 ">{children}</div>
              </div>
            </div>
          </main>
        </body>
      </html>
    </Providers>
  );
}
