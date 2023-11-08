import { FaMusic } from "react-icons/fa6";

const EmptyAlbumCover = () => {
  return (
    <div>
      <div className="z-10 flex items-center justify-center shadow-lg w-28 md:w-40 h-28 md:h-40 bg-neutral-300">
        <FaMusic className="w-20 text-neutral-700" />
      </div>

      <small className="text-xs italic">No image</small>
    </div>
  );
};

export default EmptyAlbumCover;
