import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { useGiphy, useActionOnScroll } from "../../hooks";
import { GiphyElement, ScrollUp, Spinner } from "../../components";
import { GiphyData, GiphyResponse } from "../../types/Giphy";
import "./style.scss";

export const BrowsePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGiphy({
    search: searchText,
  });

  const showSpinner = isFetching || isLoading || isFetchingNextPage;

  useActionOnScroll({
    actionFn: fetchNextPage,
    actionFlag: showSpinner,
  });

  const debouncedSetSearchText = useMemo(
    () => debounce(setSearchText, 350),
    []
  );

  const handleChangeSearchText: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    debouncedSetSearchText(event.target.value);
  };

  const noResults = !data || data?.pages[0] === null;

  const pages = (data?.pages.filter((page) => page !== null) ||
    []) as GiphyResponse[];

  const displayPage = (page: GiphyResponse) => {
    return (
      <div key={page.pagination.offset} className="search-result-page">
        {page.data.map((element, index) => (
          <GiphyElement
            giphyData={element}
            index={index}
            pagination={page.pagination}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`browse-page ${searchText ? "" : "landing-page"}`}>
      <header className="app-header">GIPHY BROWSER</header>

      <div className="search-input-wrapper">
        <input placeholder="type here..." onChange={handleChangeSearchText} />
      </div>

      <div className="search-results">
        {pages.map(displayPage)}

        {showSpinner && (
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        )}
        {!showSpinner && noResults && searchText ? "No results" : ""}
        {hasNextPage || noResults ? "" : "you reached the end of the internet"}
      </div>

      <ScrollUp />
    </div>
  );
};
