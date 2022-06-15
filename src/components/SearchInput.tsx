import { Input } from "@textkernel/oneui";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { jobActions } from "../features/slices/jobSlice";

const SearchInput = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const dispatch = useDispatch();

  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const searchedPhrase = e.currentTarget.value;
    setSearchPhrase(searchedPhrase);
  };

  useEffect(() => {
    dispatch(jobActions.searchResult(searchPhrase));
  }, [searchPhrase, dispatch]);

  return (
    <Input
      aria-label="search-input"
      data-testid="search-input"
      disabled={false}
      isBlock={false}
      value={searchPhrase}
      onChange={searchHandler}
      placeholder="Search and Press Enter/Click on Search Icon"
      size="normal"
      type="search"
    />
  );
};
export default SearchInput;
