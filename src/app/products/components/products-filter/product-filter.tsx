import Image from "next/image";

import { Button } from "@/shared/components/button";

interface ProductFilterProps {
  categories: string[];
  brands: string[];
  isToggleDropdownFilterCategory: boolean;
  isToggleDropdownFilterBrand: boolean;
  handleClickButtonFilterBrand: () => void;
  handleClickButtonFilterCategory: () => void;
  filterProductByCategory: (value: string) => void;
  filterProductByBrand: (value: string) => void;
}

export const ProductFilter = ({
  categories,
  brands,
  isToggleDropdownFilterCategory,
  isToggleDropdownFilterBrand,
  handleClickButtonFilterBrand,
  handleClickButtonFilterCategory,
  filterProductByCategory,
  filterProductByBrand,
}: ProductFilterProps) => {
  return (
    <div className="flex gap-2">
      <div>
        <Button variant="outline" onClick={handleClickButtonFilterBrand}>
          Filter By Brand
          <Image
            className="w-2.5 h-2.5 ml-2.5"
            src="/assets/icons/ic_arrow-down.svg"
            width={10}
            height={10}
            alt="arrow-down-icon"
          ></Image>
        </Button>

        <div
          className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute ${
            isToggleDropdownFilterBrand ? "block" : "hidden"
          }`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 capitalize">
            {brands.map((brand) => (
              <li
                key={brand}
                onClick={() => filterProductByBrand(brand)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Button variant="outline" onClick={handleClickButtonFilterCategory}>
          Filter By Category
          <Image
            className="w-2.5 h-2.5 ml-2.5"
            src="/assets/icons/ic_arrow-down.svg"
            width={10}
            height={10}
            alt="arrow-down-icon"
          ></Image>
        </Button>

        <div
          className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute ${
            isToggleDropdownFilterCategory ? "block" : "hidden"
          }`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 capitalize">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => filterProductByCategory(category)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
