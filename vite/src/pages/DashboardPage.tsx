import { useContext } from "react";
import { SearchContext } from "../providers/SearchProvider";
import EmptyState from "../components/EmptyState";
import LoadingComponent from "../components/Loading";
import ResultList from "../components/ResultList";

export default function DashboardPage() {
  const { isLoading, isSubmitted, searchResults } = useContext(SearchContext);

  const results = isLoading ? (
    <LoadingComponent />
  ) : (
    <ResultList results={searchResults} />
  );
  return <main>{isSubmitted ? results : <EmptyState />}</main>;
}
