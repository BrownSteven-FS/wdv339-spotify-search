const transformResult = (section) => {
  const { next, previous, offset, total, limit, items } = section;
  const metadata = {
    next,
    previous,
    offset,
    total,
    limit,
  };
  const transformedItems = items.map((item) => {
    switch (item.type) {
      case "track":
        return {
          name: item.name,
          image: item.album.images[0]?.url,
          imageAlt: item.album.images[0]?.url
            ? `Image of ${item.album.name}`
            : undefined,
          spotifyLink: item.external_urls.spotify,
        };

      case "album":
        return {
          name: item.name,
          image: item.images[0]?.url,
          imageAlt: item.images[0]?.url ? `Image of ${item.name}` : undefined,
          spotifyLink: item.external_urls.spotify,
        };
      default:
        return {
          name: item?.name,
          image: item?.images[0]?.url,
          imageAlt: item?.images[0]?.url ? `Image of ${item.name}` : undefined,
          spotifyLink: item?.external_urls.spotify,
        };
    }
  });
  return { items: transformedItems, metadata };
};

module.exports = { transformResult };
