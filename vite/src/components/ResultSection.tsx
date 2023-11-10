import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import ResultListItem from "./ResultListItem";
import { SpotifyCollection } from "../types/search";
import { useContext, useState } from "react";
import { SearchContext } from "../providers/SearchProvider";
import LoadingComponent from "./Loading";
import LoadingItem from "./LoadingItem";

interface ResultSectionProps {
  name: string;
  results: SpotifyCollection;
}
export default function ResultSection({ name, results }: ResultSectionProps) {
  const { handleUpdate } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrev = async () => {
    if (results.metadata.previous) {
      setIsLoading(true);
      await handleUpdate(results.metadata.previous);
      setIsLoading(false);
    }
  };
  const handleNext = async () => {
    setIsLoading(true);
    if (results.metadata.next) await handleUpdate(results.metadata.next);
    setIsLoading(false);
  };

  const LoadingGrid = () => (
    <>
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </>
  );
  return (
    <section className="relative">
      <h3 className="capitalize">{name}</h3>

      <>
        <div className="flex justify-center gap-2 px-4 mx-auto md:gap-8 max-w-7xl">
          <button
            onClick={handlePrev}
            disabled={!results.metadata.previous || isLoading}
            aria-label={`Previous ${name}`}
            className="flex items-center self-center justify-center w-10 h-10 mb-10 hover:opacity-80 md:mb-10 disabled:bg-neutral-500 disabled:cursor-not-allowed"
          >
            <FaArrowLeft className="w-6 h-6" />
          </button>
          {isLoading && <LoadingGrid />}
          {!isLoading &&
            results?.items.length > 0 &&
            results.items.map((item, i) => (
              <ResultListItem item={item} key={`${name}-${i}`} />
            ))}
          <button
            onClick={handleNext}
            aria-label={`Next ${name}`}
            disabled={!results.metadata.next || isLoading}
            className="flex items-center self-center justify-center w-10 h-10 mb-10 hover:opacity-80 md:mb-10 disabled:bg-neutral-500 disabled:cursor-not-allowed"
          >
            <FaArrowRight className="w-6 h-6" />
          </button>
        </div>
      </>
    </section>
  );
}
