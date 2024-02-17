import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";

const Layout = () => {

  return (
    <>
      <div className="containers">
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
    </>
  );
};

export default Layout;
