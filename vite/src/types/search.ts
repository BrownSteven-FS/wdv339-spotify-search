  export interface SpotifyMetadata {
    next: string | null;
    previous: string | null;
    offset: number;
    total: number;
    limit: number;
  }
  
  export interface SpotifyCollection {
    metadata: SpotifyMetadata;
    items: SpotifyItem[];
  }
  
  export interface SpotifySearchResults {
    artists: SpotifyCollection;
    albums: SpotifyCollection;
    tracks: SpotifyCollection;
  }
  