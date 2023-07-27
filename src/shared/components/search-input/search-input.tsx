import { FC, ChangeEvent } from "react";

import { Input } from "../input";

import { debounce } from "@/shared/utils/debounce";

interface SearchInputProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  onSearch,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 500);

  return (
    <Input type="text" placeholder={placeholder} onChange={handleInputChange} />
  );
};

export default SearchInput;
