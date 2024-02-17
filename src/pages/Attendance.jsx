import React from "react";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Text from "../components/Common/Text";
import AttendanceBoardList from "../components/Board/AttendanceBoardList";
import Button from "../components/Common/Button";
import { useLocation, useNavigate } from "react-router";

const Attendance = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onWrite = () => {
    navigate(location.pathname + "/write");
  };

  return (
    <>
      <Block>
        <div className="align vb both">
          <div>
            <Heading tag={"h1"} size={"regular"} text={"근태신청"} />
            <Text type={"type1"} text={"근태신청해주세요."} />
          </div>
          <Button className={"btn success regular"} text="근태신청" onClick={onWrite} />
        </div>
        <AttendanceBoardList filterShow={true} />
      </Block>
    </>
  );
};

export default Attendance;
