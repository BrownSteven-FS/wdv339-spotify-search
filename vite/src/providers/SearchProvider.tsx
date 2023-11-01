import { useState, createContext, ReactNode } from "react";
import { SPOTIFY_ENDPOINT } from "../lib/endpoints";
import { SearchResults } from "../types/search";
import { withAuthFetch } from "../lib/withAuth";

interface SearchContextType {
  search: () => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<any | null>>;
  searchResults: SearchResults;
  isLoading: boolean;
}

const defaultSearchResult: SearchResults = {
  albums: {},
  artists: {},
  songs: {},
};

const defaultSearchContext: SearchContextType = {
  search: () => {},
  query: "",
  setQuery: () => {},
  searchResults: defaultSearchResult,
  isLoading: false,
};

interface AuthProviderProps {
  children: ReactNode;
}
export const SearchContext = createContext(defaultSearchContext);

export const SearchProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState(defaultSearchResult);
  const [isLoading, setIsLoading] = useState(false);

  const search = async () => {
    if (query.length > 3) {
      setIsLoading(true);
      const endpoint = `${SPOTIFY_ENDPOINT}/search?term=${query}`;
      const response = await withAuthFetch(endpoint);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);

        console.log(data);
      }
      setIsLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        query,
        setQuery,
        searchResults,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
