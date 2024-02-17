import React from "react";
import "./Button.scss";

const Button = ({ className, text = "", ...props }) => {
  return (
    <button className={className} {...props}>
      {text}
    </button>
  );
};

export default Button;
