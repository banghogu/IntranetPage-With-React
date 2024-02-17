import React from "react";
import "./Form.scss";

const Textarea = ({ width, height, ...props }) => {
  const style = {
    "--width": width,
    "--height": height,
  };
  return <textarea style={style} className="textarea" {...props} />;
};

export default Textarea;
