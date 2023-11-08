import { SpotifySearchResults } from "../types/search";

export const API_BASE = `/api/v1`;

export const isSearchResultsEmpty = (results: SpotifySearchResults) => {
    return Object.values(results).every(array => array.length === 0);
}

export const setLocalQuery = (query: string, results: SpotifySearchResults) => {
    if(query)
    localStorage.setItem('query', JSON.stringify({query, results}))
    else localStorage.removeItem('query')
}

export const removeLocalQuery = () => {
    localStorage.removeItem('query')
}
export const getLocalQuery = () => {
    const query: string | null = localStorage.getItem('query')
    if(query !== null)
        return JSON.parse(query) as { query: string, results: SpotifySearchResults};
    return null;
}