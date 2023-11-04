import EmptyAlbumCover from "./EmptyAlbumCover";

interface ResultListingProps {
  item: SpotifyItem;
}

const ResultListing: React.FC<ResultListingProps> = ({ item }) => {
  return (
    <a href={item.spotifyLink} target="_blank" className="w-96">
      <article className="flex">
        {item.image ? (
          <figure className="relative">
            <img
              src={item.image}
              alt={item.imageAlt}
              className="w-auto h-32 shadow-lg mb-1 z-10"
            />
            <figcaption className="sr-only">{item.imageAlt}</figcaption>
          </figure>
        ) : (
          <EmptyAlbumCover />
        )}
        <div className="text-left pl-2">
          <h4 className="font-semibold">{item.name}</h4>
        </div>
      </article>
    </a>
  );
};

export default ResultListing;
