import { FaMusic } from "react-icons/fa6";

const EmptyAlbumCover = () => {
  return (
    <div>
      <div className="w-32 h-32 flex items-center justify-center bg-neutral-300 shadow-lg z-10">
        <FaMusic className="w-20 text-neutral-700" />
      </div>

      <small className="text-xs italic">No image</small>
    </div>
  );
};

export default EmptyAlbumCover;
