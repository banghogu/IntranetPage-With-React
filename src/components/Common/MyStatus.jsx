import React from "react";
import "./MyStatus.scss";
import Badge from "./Badge";

const MyStatus = ({ timeNow, situation, text }) => {
  return (
    <ul className="my-status">
      <li>
        <strong className="my-status__title">현재시간</strong>
        <div className="my-status__time">{timeNow}</div>
      </li>
      <li>
        <strong className="my-status__title">현재상태</strong>
        <div className="my-status__state">
          <Badge situation={situation} text={text} />
        </div>
      </li>
    </ul>
  );
};

export default MyStatus;
