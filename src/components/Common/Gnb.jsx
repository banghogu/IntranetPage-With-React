import React from "react";
import "./Gnb.scss";
import { Link, useLocation } from "react-router-dom";
const Gnb = () => {
  const location = useLocation();
  const LocationUrl = (to) => {
    return location.pathname === to ? "--active" : null;
  };
  return (
    <nav>
      <ul className="gnb">
        <li className="ico1">
          <Link to="/main" className={LocationUrl("/main")}>
            <span>첫페이지</span>
          </Link>
        </li>
        <li className="ico2">
          <Link to="/notice" className={LocationUrl("/notice")}>
            <span>공지사항</span>
          </Link>
        </li>
        <li className="ico3">
          <Link to="/attendance" className={LocationUrl("/attendance")}>
            <span>근태신청</span>
          </Link>
        </li>
        <li className="ico4">
          <Link to="/mypage" className={LocationUrl("/mypage")}>
            <span>마이페이지</span>
          </Link>
        </li>
        <li className="ico5">
          <Link to="/styleguide" className={LocationUrl("/styleguide")}>
            <span>스타일가이드</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Gnb;