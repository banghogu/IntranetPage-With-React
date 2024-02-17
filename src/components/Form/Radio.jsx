import React from "react";
import "./Form.scss";

const Radio = ({ type, id, text = "", ...props }) => {
  return (
    <>
      <input type="radio" className={"radio-" + type} id={id} {...props} />
      <label htmlFor={id}>{text}</label>
    </>
  );
};

export default Radio;
