import React, { useEffect, useRef } from "react";
import Button from "../Common/Button";
import Profile from "../Common/Profile";
import pic1 from "../../assets/profile1.jpg";
import { auth, db } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceBoardView from "./AttendanceBoardView";
import Badge from "../Common/Badge";
import "./AttendanceBoardListItem.scss";
import { doc, getDoc } from "firebase/firestore";

const AttendanceBoardListItem = ({ content, createdAt, startdate, enddate, select, title, userId, username, id, userImg }) => {
  const [isSelect, setIsSelect] = useState("");
  const [isToggle, setIsToggle] = useState(false);

  const onInfo = (e) => {
    e.preventDefault();
    setIsToggle(!isToggle);
  };

  const onSituation = () => {
    if (select === "연차") {
      setIsSelect("primary");
    } else if (select === "반차") {
      setIsSelect("success");
    } else if (select === "조퇴") {
      setIsSelect("danger");
    } else if (select === "기타") {
      setIsSelect("light");
    }
  };
  useEffect(() => {
    onSituation();
  }, []);

  return (
    <li>
      <a href="" onClick={onInfo}>
        <Profile userImg={userImg} />
        <div className="board__status">
          <Badge situation={isSelect} text={select} />
        </div>
        <div className="board__title">{title}</div>
        <div className="board__writer">{username}</div>
      </a>
      <div className={isToggle ? "attend-view --active" : "attend-view"}>
        <div className="attend-view__date">
          {startdate} ~ {enddate}
        </div>
        <div className="attend-view__content">{content}</div>
      </div>
    </li>
  );
};

export default AttendanceBoardListItem;
