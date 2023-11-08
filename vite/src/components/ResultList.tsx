import { SpotifySearchResults } from "../types/search";
import { getLocalQuery } from "../lib/helpers";
import ResultSection from "./ResultSection";

interface ResultListProps {
  results: SpotifySearchResults;
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  const query = getLocalQuery();

  return (
    <main className="my-4 text-center ">
      <h2 className="mb-8">
        Search Results for:{" "}
        <span className="font-serif tracking-wide text-primary">
          {query?.query}
        </span>
      </h2>

      <ResultSection name="artist" results={results.artists} />
      <ResultSection name="albums" results={results.albums} />
      <ResultSection name="songs" results={results.tracks} />
    </main>
  );
};

export default ResultList;
