import React from "react";
import "./Form.scss";

const Input = ({ width, ...props }) => {
  const style = {
    "--width": width,
  };
  return <input style={style} className="input" {...props} />;
};

export default Input;
