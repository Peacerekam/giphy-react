import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { GiphyResponse } from "../../types/Giphy";

const API_KEY = "z3TCxWMXI3poet0DNQBeC8RfYrprX7U1";
const API_URL = "https://api.giphy.com/v1";

const DEFAULT_PARAMS = {
  api_key: API_KEY,
  limit: "5",
  rating: "G",
  lang: "en",
  // q: '',
};

type UseGiphyHookProps = {
  search?: string;
};

export const useGiphy = ({ search }: UseGiphyHookProps) => {
  const fetchImages = async ({ pageParam = 0 }) => {
    if (!search) return null;

    const params = {
      ...DEFAULT_PARAMS,
      q: search,
      offset: pageParam,
    };

    const searchURL = `${API_URL}/gifs/search`;
    const { data } = await axios.get<GiphyResponse>(searchURL, { params });

    return data;
  };

  return useInfiniteQuery({
    queryKey: ["giphy-images", search],
    queryFn: fetchImages,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination) return undefined;
      const { pagination } = lastPage;
      const { offset, total_count, count } = pagination;
      if (offset >= total_count) return undefined;
      return offset + count;
    },
  });
};
