
export type GiphyUser = {
  username: string;
  display_name: string;
  avatar_url: string;
  profile_url: string;
  is_verified: boolean;
  // ...
};

export type GiphyImage = {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  frames: string;
  hash: string;
  // ...
};

export type GiphyData = {
  type: string; // "gif" | ...
  id: string;
  url: string;
  slug: string;
  username: string;
  rating: string;
  import_datetime: string;
  trending_datetime: string;
  user: GiphyUser;
  title: string;
  images: {
    original: GiphyImage;
    preview: GiphyImage;
    preview_gif: GiphyImage;
    looping: GiphyImage;
    // ...
  };
  // ...
};

export type GiphyPagination = {
  total_count: number;
  count: number;
  offset: number;
};

export type GiphyMeta = {
  status: number; // 200 | 500 | ...
  msg: string; // "OK" | ...
  response_id: string;
};

export type GiphyResponse = {
  data: GiphyData[];
  pagination: GiphyPagination;
  meta: GiphyMeta;
};
