import React from "react";
import Logo from "../components/Common/Logo";
import Gnb from "../components/Common/Gnb";
import Button from "../components/Common/Button";
import "./Header.scss";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log("logout error : ", error);
    }
  };
  return (
    <header className="header">
      <Logo />
      <Gnb />
      <Button onClick={logout} className={"btn-logout"} />
    </header>
  );
};

export default Header;
