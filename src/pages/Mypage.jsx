import React, { useEffect, useState } from "react";
import Block from "../components/Common/Block";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import MypageInfo from "../components/mypageComponents/MypageInfo";

const Mypage = () => {

  //사용자 state
  const [name, setName] = useState(""); //사용자 이름 state
  const [shortInfo, setShortInfo] = useState("") //사용자 한줄소개 state
  const [userImg, setUserImg] = useState("") //사용자 유저 이미지 state
  const [userEmail, setUserEmail] = useState("") //사용자 이메일
  const [userPhone, setUserPhone] = useState("") //사용자 전화번호
  const [userJob, setUserJob] = useState("") //사용자 직급
  const [userBg, setUserBg] = useState("")

  //근무 state
  const [workStartTime, setWorkStartTime] = useState("")
  const [workEndTime, setWorkEndTime] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const { displayName, photoURL, email } = user;
        setName(displayName || "");
        setUserImg(photoURL || "");
        setUserEmail(email || "");

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        const userShortInfo = userDoc.data()?.shortInfo;
        const userPhone = userDoc.data()?.phoneNumber;
        const userJob = userDoc.data()?.job;
        const userBg = userDoc.data()?.bg;

        setShortInfo(userShortInfo)
        setUserPhone(userPhone)
        setUserJob(userJob)
        setUserBg(userBg)

        try {
          await setDoc(userDocRef, {
            name: displayName,
            email: email,
            phoneNumber: userPhone || "",
            photoURL: photoURL,
            job: userJob || "",
            shortInfo: userShortInfo || "",
            bg: userBg || "",
          }, { merge: true });

        } catch (error) {
          console.error("에러발생:", error);
        }

        const today = new Date();
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate() }일`;
        const userWorkDocRef = doc(db, 'workingtimeline', user.uid, user.displayName, formattedDate);
        const userWorkDoc = await getDoc(userWorkDocRef);

        if (userWorkDoc) {
          const startTime = userWorkDoc.data()?.startTime;
          const endTime = userWorkDoc.data()?.endTime;

          setWorkStartTime(startTime || "");
          setWorkEndTime(endTime || "");

          try {
            await setDoc(userWorkDocRef, {
              startTime: startTime || "",
              endTime: endTime || "",
            }, { merge: true });

          } catch (error) {
            console.error("에러발생:", error);
          }
        } else {
          setWorkStartTime("");
          setWorkEndTime("");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <Block>
        <MypageInfo
          user={auth.currentUser}
          name={name}
          shortInfo={shortInfo}
          userImg={userImg}
          userEmail={userEmail}
          userJob={userJob}
          userBg={userBg}
          userPhone={userPhone}
          workStartTime={workStartTime}
          workEndTime={workEndTime}
          //근태 상태 필요

          setWorkStartTime={setWorkStartTime}
          setWorkEndTime={setWorkEndTime}
        />
    </Block>
  )
};

export default Mypage;
