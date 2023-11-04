import { FaPencilRuler } from "react-icons/fa";

const EmptyState = () => {
  return (
    <section className="flex flex-col items-center justify-center h-full min-h-[300px]">
      <FaPencilRuler className="mb-4 text-6xl text-gray-300" />
      <h2 className="text-lg text-center text-gray-700">Let's get searching</h2>
      <p className="text-center">
        Type at least 3 characters into the search bar and press enter to get
        started
      </p>
    </section>
  );
};

export default EmptyState;
