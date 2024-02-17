import React from "react";
import "./Form.scss";

const InputDate = ({ placehodler, className, ...props }) => {
  return (
    <input type="date" data-placeholder={placehodler} className={"date " + className} {...props} />
  );
};

export default InputDate;
