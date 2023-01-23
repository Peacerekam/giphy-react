import { useEffect } from "react";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";
import { GiphyResponse } from "../../types/Giphy";

type UseScrollHookProps = {
  actionFn: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<GiphyResponse | null, unknown>
  > | void;
  actionFlag?: boolean;
  from?: "top" | "bottom";
};

export const useActionOnScroll = ({
  actionFn,
  actionFlag = false,
  from = "bottom"
}: UseScrollHookProps) => {
  useEffect(() => {
    const onScroll = async () => {
      if (actionFlag) return;

      const currentPosition = window.innerHeight + window.scrollY;
      const pxAhead = 1000;
      const to = from === "bottom" ? document.body.offsetHeight : 0;
      if (currentPosition + pxAhead < to) return;

      actionFn();
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [actionFlag, actionFn]);
};
