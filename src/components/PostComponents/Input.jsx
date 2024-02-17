import React, { useState } from "react";

const Input = ({ width, value, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    if (event && event.target && event.target.value !== undefined) {
      onChange(event, name); // 수정된 부분
    } else {
      console.error('Invalid event or field');
    }
  };



  const style = {
    "--width": width,
  };

  return <input style={style} className="input" value={inputValue} onChange={handleChange} {...props} />;
};

export default Input;
