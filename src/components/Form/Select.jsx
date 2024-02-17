import React from "react";
import "./Form.scss";

const Select = ({ placeholder, options, ...props }) => {
  return (
    <select className="select" {...props}>
      {placeholder && <option hidden>{placeholder}</option>}
      {options.map(({ value, text }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select;
