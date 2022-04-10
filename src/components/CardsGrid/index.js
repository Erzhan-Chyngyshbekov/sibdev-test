import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { storeContext } from "../../Contexts/StoreContext";
import GridCard from "../Cards/GridCard";

export default function CardGrid() {
  const { videos } = useContext(storeContext);

  return (
    <Grid container spacing={3}>
      {videos.map((video, id) => (
        <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
          <GridCard data={video} />
        </Grid>
      ))}
    </Grid>
  );
}
