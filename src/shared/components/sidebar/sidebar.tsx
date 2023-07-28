"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_MENU } from "@/shared/constants/menu.constant";

export const Sidebar = () => {
  const pathname = usePathname();

  function isActiveMenu(url: string): boolean {
    return pathname === url;
  }
  return (
    <div>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200">
          <ul className="space-y-2 font-medium">
            {SIDEBAR_MENU.map((data) => (
              <li key={data.id}>
                <Link
                  href={data.href}
                  className={`${
                    isActiveMenu(data.href) && "bg-gray-100"
                  } flex items-center p-2 text-black transition duration-75 rounded-lg hover:bg-gray-100 group hover:cursor-pointer`}
                >
                  <Image
                    src={data.image}
                    width={20}
                    height={20}
                    alt={data.alt}
                  ></Image>
                  <span className="ml-3">{data.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
