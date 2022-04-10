import React from "react";
import Login from "../../components/Auth/Login/login";

export default function LogInPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
      }}
    >
      <Login />
    </div>
  );
}
