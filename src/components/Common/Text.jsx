import React from "react";
import "./Text.scss";

const Text = ({ type, text }) => {
  return (
    <>
      <p className={"txt-" + type}>{text}</p>
    </>
  );
};

export default Text;
