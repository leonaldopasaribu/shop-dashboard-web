import Link from "next/link";

import { SIDEBAR_MENU } from "@/shared/constants/menu.constant";

export const Header = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 py-2.5 lg:hidden overflow-x-auto dark:bg-gray-800">
        <div className="w-full">
          <ul className="flex mt-4 font-bold justify-evenly">
            {SIDEBAR_MENU.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.href}
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 dark:text-white"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
