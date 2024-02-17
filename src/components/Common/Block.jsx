import React from "react";
import "./Block.scss";

const Block = ({ className = "", ...props }) => {
  return <div className={"block " + className}>{props.children}</div>;
};

export default Block;
