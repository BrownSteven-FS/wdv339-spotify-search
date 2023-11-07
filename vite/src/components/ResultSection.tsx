import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import ResultListing from "./ResultListing";

interface ResultSectionProps {
  name: string;
  results: SpotifyItem[];
}
export default function ResultSection({ name, results }: ResultSectionProps) {
  const handlePrev = () => {};
  const handleNext = () => {};
  return (
    <section className="relative">
      <h3 className="capitalize">{name}</h3>
      {results.length > 0 && (
        <>
          <div className="flex justify-center gap-2 px-4 mx-auto md:gap-8 max-w-7xl">
            <button
              onClick={handlePrev}
              aria-label={`Previous ${name}`}
              className="flex items-center self-center justify-center w-10 h-10 mb-10 hover:opacity-80 md:mb-10"
            >
              <FaArrowLeft className="w-6 h-6" />
            </button>
            {results.map((item, i) => (
              <ResultListing item={item} key={`${name}-${i}`} />
            ))}
            <button
              onClick={handleNext}
              aria-label={`Next ${name}`}
              className="flex items-center self-center justify-center w-10 h-10 mb-10 hover:opacity-80 md:mb-10"
            >
              <FaArrowRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
