import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import ResultListItem from "./ResultListItem";
import { SpotifyCollection } from "../types/search";
import { useContext } from "react";
import { SearchContext } from "../providers/SearchProvider";

interface ResultSectionProps {
  name: string;
  results: SpotifyCollection;
}
export default function ResultSection({ name, results }: ResultSectionProps) {
  const { handleUpdate } = useContext(SearchContext);
  const handlePrev = () => {
    if (results.metadata.previous) handleUpdate(results.metadata.previous);
  };
  const handleNext = () => {
    if (results.metadata.next) handleUpdate(results.metadata.next);
  };
  return (
    <section className="relative">
      <h3 className="capitalize">{name}</h3>
      {results?.items.length > 0 && (
        <>
          <div className="flex justify-center gap-2 px-4 mx-auto md:gap-8 max-w-7xl">
            <button
              onClick={handlePrev}
              disabled={!results.metadata.previous}
              aria-label={`Previous ${name}`}
              className="flex items-center self-center justify-center w-10 h-10 mb-10 hover:opacity-80 md:mb-10 disabled:bg-neutral-500 disabled:cursor-not-allowed"
            >
              <FaArrowLeft className="w-6 h-6" />
            </button>
            {results.items.map((item, i) => (
              <ResultListItem item={item} key={`${name}-${i}`} />
            ))}
            <button
              onClick={handleNext}
              aria-label={`Next ${name}`}
              className="flex items-center self-center justify-center w-10 h-10 mb-10 hover:opacity-80 md:mb-10 disabled:bg-neutral-500 disabled:cursor-not-allowed"
            >
              <FaArrowRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
