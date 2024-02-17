import React from "react";
import "./Main.scss";

const Main = ({ ...props }) => {
  return (
    <>
      <main>{props.children}</main>
    </>
  );
};

export default Main;
