import { useContext } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SearchContext } from "../providers/SearchProvider";

export default function Searchbar() {
  const { query, setQuery, search } = useContext(SearchContext);
  const handleOnBlur = () => {
    search();
  };

  return (
    <fieldset className="flex items-center justify-center">
      <legend className="sr-only">Search</legend>
      <FaMagnifyingGlass
        aria-hidden="true"
        className="w-4 h-4 mx-2 my-1 text-white"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={handleOnBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOnBlur();
            e.currentTarget.blur();
          }
        }}
        placeholder="Search"
        className="w-48 text-xl text-white bg-transparent border-b border-white md:w-96 placeholder:text-neutral-50 placeholder:text-base"
      />
    </fieldset>
  );
}
