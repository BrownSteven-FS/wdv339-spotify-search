import { useContext } from "react";
import { SearchResults } from "../types/search";
import { SearchContext } from "../providers/SearchProvider";
import ResultListing from "./ResultListing";

interface ResultListProps {
  results: SearchResults;
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  const { query } = useContext(SearchContext);

  return (
    <main className="my-4 text-center md:my-14">
      <h2 className="mb-8">
        Search Results for:{" "}
        <span className="font-serif tracking-wide text-primary">{query}</span>
      </h2>

      <section>
        <h3>Artists</h3>
        {results.artists.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 mx-auto max-w-7xl">
            {results.artists.map((artist, i) => (
              <ResultListing item={artist} key={`artist-${i}`} />
            ))}
          </div>
        )}
      </section>
      <section>
        <h3>Albums</h3>
        {results.albums.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 mx-auto max-w-7xl">
            {results.albums.map((album, i) => (
              <ResultListing item={album} key={`album-${i}`} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h3>Songs</h3>
        {results.tracks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 mx-auto max-w-7xl">
            {results.tracks.map((track, i) => (
              <ResultListing item={track} key={`song-${i}`} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ResultList;
