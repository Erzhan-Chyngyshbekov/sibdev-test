import React from "react";
import Truncate from "react-truncate";
import classes from "./listCard.module.scss";

export default function ListCard({ data }) {
  const handleFollowLink = () => {
    window.open(`https://www.youtube.com/watch?v=${data.id.videoId}`);
  };

  return (
    <div onClick={handleFollowLink} className={classes.card}>
      <img
        src={data.snippet.thumbnails.high.url}
        className={classes.card__img}
      />
      <div className={classes.card__content}>
        <h3 className={classes.card__title}>
          <Truncate lines={2} ellipsis={"..."}>
            {data.snippet.title}
          </Truncate>
        </h3>
        <p className={classes.card__description}>
          <Truncate lines={2} ellipsis={"..."}>
            {data.snippet.channelTitle}
          </Truncate>
        </p>
      </div>
    </div>
  );
}
