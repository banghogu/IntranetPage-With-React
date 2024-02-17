import React from "react";
import "./Heading.scss";

const Heading = ({ tag, size, text }) => {
  const HeadingName = tag;
  const isClass = "heading " + size;
  return <HeadingName className={isClass}>{text}</HeadingName>;
};

export default Heading;
