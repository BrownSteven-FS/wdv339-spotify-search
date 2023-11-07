import EmptyAlbumCover from "./EmptyAlbumCover";

interface ResultListingProps {
  item: SpotifyItem;
}

const ResultListing: React.FC<ResultListingProps> = ({ item }) => {
  return (
    <a href={item.spotifyLink} target="_blank" className="group">
      <article className="flex flex-col items-center justify-center group group-hover:opacity-60 hover:grayscale">
        {item.image ? (
          <figure className="relative">
            <img
              src={item.image}
              alt={item.imageAlt}
              className="z-10 w-auto mb-1 shadow-xl h-28 md:h-40"
            />
            <figcaption className="sr-only">{item.imageAlt}</figcaption>
          </figure>
        ) : (
          <EmptyAlbumCover />
        )}
        <div className="pl-2 text-center max-w-[110px] md:max-w-[160px]">
          <h4 className="font-semibold">{item.name}</h4>
        </div>
      </article>
    </a>
  );
};

export default ResultListing;
