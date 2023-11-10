import { useContext } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SearchContext } from "../providers/SearchProvider";
import { FaTimes } from "react-icons/fa";

export default function Searchbar() {
  const { query, setQuery, search, clearSearch } = useContext(SearchContext);
  const handleOnBlur = () => {
    if (query.length > 2) search();
    else clearSearch();
  };

  return (
    <fieldset className="relative z-0 flex items-center justify-center">
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
        className="w-48 p-1 text-xl text-white bg-transparent border-b border-white bg-none md:w-96 placeholder:text-neutral-50 placeholder:text-base outline-dark"
      />
      <button
        onClick={() => setQuery("")} // Assuming setQuery is your state setter for the query
        className="absolute right-1 p-1.5 border-b-[1.5]  rounded-none bg-none"
        aria-label="Clear search"
      >
        <FaTimes className="w-3 h-3 bg-none" />
      </button>
    </fieldset>
  );
}
