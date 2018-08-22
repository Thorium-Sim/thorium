import React, { Component } from "react";
import { Button } from "reactstrap";
const Connection = ({ connect }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <Button color="warning" size="lg" onClick={connect}>
        Connect
      </Button>
    </div>
  );
};

export default Connection;
