import React, { useEffect, useState } from "react";
import "./InfoList.scss";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const InfoList = () => {

  const [userEmail, setUserEmail] = useState("") //사용자 이메일
  const [userPhone, setUserPhone] = useState("") //사용자 전화번호
  const [userJob, setUserJob] = useState("") //사용자 직급

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const { email } = user;
        setUserEmail(email || "");

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        const userPhone = userDoc.data()?.phoneNumber;
        const userJob = userDoc.data()?.job;

        setUserPhone(userPhone)
        setUserJob(userJob)
      }
    };
    fetchData();
  }, []);



  return (
    <ul className="info-list">
      <li className="tel">
        <strong className="info-list__title">Phone</strong>
        {userPhone ? <div className="info-list__content">{userPhone}</div> : <div className="info-list__content">-</div>}
      </li>
      <li className="job">
        <strong className="info-list__title">Job</strong>
        {userJob ? <div className="info-list__content">{userJob}</div> : <div className="info-list__content">-</div>}
      </li>
      <li className="email">
        <strong className="info-list__title">Email</strong>
        <div className="info-list__content">{userEmail}</div>
      </li>
    </ul>
  );
};

export default InfoList;
