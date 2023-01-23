import "./style.scss";
import { GiphyData, GiphyPagination } from "../../types/Giphy";

type GiphyElementProps = {
  pagination: GiphyPagination;
  giphyData: GiphyData;
  index: number;
};

export const GiphyElement = ({
  giphyData,
  index,
  pagination,
}: GiphyElementProps) => {
  const { hash, url } = giphyData.images.original;
  const { import_datetime, title, user } = giphyData;
  const { offset, total_count } = pagination;

  const formattedDate = new Date(import_datetime).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div key={hash} className="image-block-wrapper">
      <div className="user-display">
        {user && <img alt="avatar" src={user.avatar_url} />}
        <div className="pfp-label">
          <div className="display-name">
            {user ? user.display_name : "Unknown User"}
          </div>
          <div className="display-date">{formattedDate}</div>
        </div>
      </div>

      <div className="image-wrapper">
        <div className="image-title">{title}</div>
        <img
          loading="lazy"
          alt={title}
          className="main-image"
          key={hash}
          src={url}
        />
      </div>
      <div className="image-footer">
        {offset + index + 1}/{total_count}
      </div>
    </div>
  );
};
