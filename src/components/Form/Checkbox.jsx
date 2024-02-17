import React from "react";
import "./Form.scss";

const Checkbox = ({ type, id, text = "", ...props }) => {
  return (
    <>
      <input type="checkbox" className={"check-" + type} id={id} {...props} />
      <label htmlFor={id}>{text}</label>
    </>
  );
};

export default Checkbox;
