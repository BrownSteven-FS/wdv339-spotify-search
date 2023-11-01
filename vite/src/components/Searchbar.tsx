import { useContext } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SearchContext } from "../providers/SearchProvider";

export default function Searchbar() {
  const { query, setQuery, search } = useContext(SearchContext);
  const handleOnBlur = () => {
    if (query.length > 3) {
      search();
    }
  };

  return (
    <fieldset className="flex items-center justify-center">
      <legend className="sr-only">Search</legend>
      <FaMagnifyingGlass
        aria-hidden="true"
        className="text-white h-4 w-4 my-1 mx-2"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={handleOnBlur}
        placeholder="Search"
        className="text-xl w-96 border-b border-white text-white bg-transparent placeholder:text-neutral-50 placeholder:text-base"
      />
    </fieldset>
  );
}
