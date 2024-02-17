import React, { useEffect, useState } from "react";
import "./MainContent.scss";
import BusinessCard from "../components/BusinessCard";
import TimeBlock from "../components/TimeBlock";
import PersonInfoList from "../components/PersonInfoList";
import BoardGallery from "../components/PostComponents/BoardGallery";
import Block from "../components/Common/Block";
import AttendanceBoardList from "../components/Board/AttendanceBoardList";
import Heading from "../components/Common/Heading";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const MainContent = () => {
  //호진 추가
  const [timeNow, setTimeNow] = useState("");
  const [workStartTime, setWorkStartTime] = useState("");
  const [workEndTime, setWorkEndTime] = useState("");

  //호진 추가
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
        const userWorkDocRef = doc(db, "workingtimeline", user.uid, user.displayName, formattedDate);
        const userWorkDoc = await getDoc(userWorkDocRef);
        if (userWorkDoc) {
          const startTime = userWorkDoc.data()?.startTime;
          const endTime = userWorkDoc.data()?.endTime;

          setWorkStartTime(startTime || "");
          setWorkEndTime(endTime || "");
        }
      }
    };
    const updateCurrentTime = () => {
      const today = new Date();
      const formattedMinutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
      const formattedTime = `${today.getHours()}:${formattedMinutes}`;
      setTimeNow(formattedTime);
    };
    fetchData();
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  //호진 추가
  const calWorkingTime = (end, start) => {
    // 시:분 차이 계산을 위한 함수
    const endTime = new Date(`2000-01-01 ${end}`); // 2000-01-01은 시간 계산을 위해 임의의 날짜를 정함
    const startTime = new Date(`2000-01-01 ${start}`);
    const differenceInMilliseconds = endTime.getTime() - startTime.getTime(); //getTime으로 밀리초 단위를 받아 오고 그 차이를 계산
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)); //전체 초를 1시간 단위롤 나눠서 시(hours)를 얻는다.
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)); //1시간 단위로 나눈 나머지를 다시 분으로 나눠서 분을 얻는다
    const formattedHours = hours.toString().padStart(2, "0"); //시간을 toString으로 문자열로 바꾸고, padStart 함수를 사용해 2보다 작을경우 앞쪽에 0을 추가한다.
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="main">
      <div className="main-top">
        <Block className="main__attend">
          <div className="align both vm">
            <Heading tag={"h2"} size={"small"} text={"Attendance State"} />
            <Link to="/attendance" className="btn small success ">
              근태현황 바로가기
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
              </svg>
            </Link>
          </div>
          <AttendanceBoardList filterShow={false} />
        </Block>

        <div>
          <BusinessCard workStartTime={workStartTime} workEndTime={workEndTime} setWorkStartTime={setWorkStartTime} setWorkEndTime={setWorkEndTime} timeNow={timeNow} />
          <div className="mt10">
            <PersonInfoList />
          </div>
        </div>
      </div>
      <div className="time-wrap">
        <TimeBlock time={timeNow} title={"현재시간"} icon={"ico1"} />
        {workStartTime ? <TimeBlock time={workStartTime} title={"근무시작"} icon={"ico3"} /> : <TimeBlock time=" - " title={"근무시작"} icon={"ico3"} />}
        {workEndTime ? <TimeBlock time={workEndTime} title={"근무종료"} icon={"ico3"} /> : <TimeBlock time=" - " title={"근무종료"} icon={"ico3"} />}
        {workStartTime && workEndTime ? <TimeBlock time={calWorkingTime(workEndTime, workStartTime)} title={"근무시간"} icon={"ico4"} /> : <TimeBlock time={" - "} title={"근무시간"} icon={"ico4"} />}
      </div>

      <BoardGallery pagination={false} />
    </div>
  );
};

export default MainContent;
