import React, { useEffect, useState } from "react";
import Profile from "./Common/Profile";
import Heading from "./Common/Heading";
import Block from "./Common/Block";
import "./BusinessCard.scss";
import Text from "./Common/Text";
import MyStatus from "./Common/MyStatus";
import Button from "./Common/Button";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Dialog from "./Common/Dialog";

const BusinessCard = ({ workStartTime, workEndTime,setWorkStartTime,setWorkEndTime,timeNow }) => {

  const [name, setName] = useState(""); // 사용자 이름 state
  const [shortInfo, setShortInfo] = useState(""); // 사용자 한줄소개 state
  const [userImg, setUserImg] = useState(""); // 사용자 유저 이미지 state

  //모달에 관한 state
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const { displayName, photoURL } = user;
        setName(displayName || "");
        setUserImg(photoURL || "");

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        const userShortInfo = userDoc.data()?.shortInfo;
        setShortInfo(userShortInfo);
      }
    };
    fetchData();
  }, []);

  const workStart = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setWorkStartTime(formattedTime);
    const userDocRef = doc(db, 'workingtimeline', user.uid, user.displayName, formattedDate);
    await setDoc(userDocRef, {
      startTime: formattedTime
    }, { merge: true });
  }

  const workEnd = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setWorkEndTime(formattedTime);
    const userDocRef = doc(db, 'workingtimeline', user.uid, user.displayName, formattedDate);
    await setDoc(userDocRef, {
      endTime: formattedTime
    }, { merge: true });
  }

  return (
    <div className="business-card">
      <Block>
        <Profile userImg={userImg} />
        <Heading tag={"h2"} size={"small"} text={name} />
        {shortInfo ? <Text type={"type1"} text={shortInfo} /> : <Text type={"type1"} text={"-"} />}

        {workStartTime === "" && workEndTime === "" && (
          <MyStatus timeNow={timeNow} situation={"primary"} text={"근무 전"} />
        )}
        {workStartTime !== "" && workEndTime === "" && (
          <MyStatus timeNow={timeNow} situation={"success"} text={"근무 중"} />
        )}
        {workStartTime !== "" && workEndTime !== "" && (
          <MyStatus timeNow={timeNow} situation={"danger"} text={"근무 종료"} />
        )}

        {workStartTime === "" && workEndTime === "" && (
          <>
            <Button className={"btn primary regular"} text="근무시작" onClick={() => { setAlertModal(true); }} />
            <Dialog openModal={alertModal} closeModal={() => setAlertModal(false)} className={"alert"}>
              <div className="txt-center"> 근무를 시작하시겠습니까? </div>
              <div className="align center mt20">
                <Button className={"btn regular primary"} text="확인"
                  onClick={() => {
                    workStart()
                    setAlertModal(false);
                  }} />
                <Button
                  className={"btn regular danger"}
                  text="취소"
                  type="button"
                  onClick={() => {
                    setAlertModal(false);
                  }}
                />
              </div>
            </Dialog>
          </>
        )}

        {workStartTime !== "" && workEndTime === "" && (
          <>
            <Button className={"btn danger regular"} text="근무종료" onClick={() => { setAlertModal(true); }} />
            <Dialog openModal={alertModal} closeModal={() => setAlertModal(false)} className={"alert"}>
              <div className="txt-center"> 근무를 종료하시겠습니까? </div>
              <div className="align center mt20">
                <Button className={"btn regular primary"} text="확인"
                  onClick={() => {
                    workEnd()
                    setAlertModal(false);
                  }} />
                <Button
                  className={"btn regular danger"}
                  text="취소"
                  type="button"
                  onClick={() => {
                    setAlertModal(false);
                  }}
                />
              </div>
            </Dialog>
          </>
        )}
        {workStartTime !== "" && workEndTime !== "" && (
          <>
            <Button className={"btn primary regular"} text="근무시작" disabled />
          </>
        )}
      </Block>
    </div>
  );
};

export default BusinessCard;