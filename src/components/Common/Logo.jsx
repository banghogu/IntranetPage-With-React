import React from "react";
import "./Logo.scss";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <h1 className="logo">
      <img src={logo} alt="" />
    </h1>
  );
};

export default Logo;
