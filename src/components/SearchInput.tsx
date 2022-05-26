import { Input, SearchButton } from "@textkernel/oneui";
import { useState } from "react";

interface IProps {
  onSearch: (searchQuery: string) => void;
}

const SearchInput = ({ onSearch }: IProps) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const searchText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.type === "click") {
      onSearch(searchPhrase);
    }
  };
  return (
    <>
      <Input
        data-testid="search-bar"
        disabled={false}
        isBlock={false}
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
        onKeyPress={searchText}
        placeholder="Search by Job Title or Organization Name..."
        size="large"
        type="search"
      />
      <SearchButton
        data-testid="search-button"
        disabled={false}
        onClick={() => onSearch(searchPhrase)}
        type="submit"
      />
    </>
  );
};
export default SearchInput;
