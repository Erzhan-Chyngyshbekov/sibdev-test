import React, { useContext } from "react";
import { storeContext } from "../../Contexts/StoreContext";
import ListCard from "../Cards/ListCard";

export default function CardList() {
  const { videos } = useContext(storeContext);

  return (
    <>
      {videos.map((video, id) => (
        <ListCard key={id} data={video} />
      ))}
    </>
  );
}
