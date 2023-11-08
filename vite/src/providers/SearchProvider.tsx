import { useState, createContext, ReactNode, useEffect } from "react";
import { SPOTIFY_ENDPOINT } from "../lib/endpoints";
import { withAuthFetch } from "../lib/withAuth";
import { getLocalQuery, removeLocalQuery, setLocalQuery } from "../lib/helpers";
import { SpotifyMetadata, SpotifySearchResults } from "../types/search";

interface SearchContextType {
  search: () => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<any | null>>;
  searchResults: SpotifySearchResults;
  isLoading: boolean;
  isSubmitted: boolean;
  clearSearch: () => void;
}
const defaultMetaData: SpotifyMetadata = {
  next: null,
  previous: null,
  offset: 0,
  total: 0,
  limit: 3,
};

const defaultSearchResult: SpotifySearchResults = {
  albums: { items: [], metadata: defaultMetaData },
  artists: { items: [], metadata: defaultMetaData },
  tracks: { items: [], metadata: defaultMetaData },
};

const defaultSearchContext: SearchContextType = {
  search: () => {},
  query: "",
  setQuery: () => {},
  searchResults: defaultSearchResult,
  isLoading: false,
  isSubmitted: false,
  clearSearch: () => {},
};

interface AuthProviderProps {
  children: ReactNode;
}
export const SearchContext = createContext(defaultSearchContext);

export const SearchProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState(defaultSearchResult);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const checkLocalQuery = () => {
      const result = getLocalQuery();
      if (result) {
        setIsSubmitted(true);
        setQuery(result.query);
        setSearchResults({ ...result.results });
      } else {
      }
    };
    if (!query) checkLocalQuery();
  }, []);

  const search = async () => {
    if (query.length > 2 && !isLoading) {
      setIsLoading(true);
      setIsSubmitted(true);
      const previousQuery = getLocalQuery();
      if (previousQuery !== null)
        if (
          previousQuery.query !== query ||
          previousQuery.results.artists.items.length === 0
        ) {
          const endpoint = `${SPOTIFY_ENDPOINT}/search?term=${query}`;
          const response = await withAuthFetch(endpoint);
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            setSearchResults(data);
            setLocalQuery(query, data);
            console.log(data);
          }
        } else {
          setSearchResults(previousQuery?.results);
        }

      setIsLoading(false);
    } else {
      removeLocalQuery();
    }
  };

  const clearSearch = async () => {
    setIsSubmitted(false);
    setSearchResults(defaultSearchResult);
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        searchResults,
        clearSearch,
        query,
        setQuery,
        isLoading,
        isSubmitted,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
