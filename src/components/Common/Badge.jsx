import React from "react";
import "./Badge.scss";

const Badge = ({ situation, text }) => {
  return <span className={"badge regular " + situation}>{text}</span>;
};

export default Badge;
