import React from "react";
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";

export default function MainLayout(props) {
  return (
    <React.Fragment>
      <Navbar />
      <Container style={{ maxWidth: "1088px" }}>
        <main>{props.children}</main>
      </Container>
    </React.Fragment>
  );
}
