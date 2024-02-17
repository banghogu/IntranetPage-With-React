import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import AttendanceBoardListItem from "./AttendanceBoardListItem";
import Select from "../Form/Select";
import { attendanceViewOption } from "../../data/selectOption";
import "./AttendanceBoardList.scss";

const AttendanceBoardList = ({ filterShow }) => {
  const user = auth.currentUser;
  const [attends, setAttends] = useState([]);
  const [isSort, setIsSort] = useState("모두");
  // const [userImg, setUserImg] = useState([]);

  useEffect(() => {
    const fetchAttend = async () => {
      const attendQuery = query(collection(db, `attendance`), orderBy("createdAt", "desc"), limit(10));

      const unsubscribe = await onSnapshot(attendQuery, (snapshot) => {
        const attends = snapshot.docs.map((doc) => {
          const { content, createdAt, startdate, enddate, select, title, userId, username, userImg } = doc.data();
          return {
            content,
            createdAt,
            startdate,
            enddate,
            select,
            title,
            userId,
            username,
            id: doc.id,
            userImg,
          };
        });
        setAttends(attends);
      });
      return () => unsubscribe();
    };
    fetchAttend();
    // const fetchImg = async () => {
    //   const imgQuery = query(collection(db, `users`), limit(10));

    //   const unsubscribe = await onSnapshot(imgQuery, (snapshot) => {
    //     const images = snapshot.docs.map((doc) => {
    //       const { photoURL } = doc.data();
    //       return {
    //         photoURL,
    //       };
    //     });
    //     setUserImg(images);
    //   });
    //   return () => unsubscribe();
    // };
    // fetchImg();
  }, []);

  const onChange = (e) => {
    const value = e.target.value;
    setIsSort(value);
  };
  const filteredAttends = isSort === "모두" ? attends : attends.filter((attend) => attend.select === isSort);

  return (
    <>
      {filterShow && (
        <div className="align right attend-filter">
          <Select options={attendanceViewOption} onChange={onChange} />
        </div>
      )}
      <div className={"list"}>
        <ul className={"board"}>
          {filteredAttends.map((attend) => (
            <AttendanceBoardListItem key={attend.id} {...attend} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default AttendanceBoardList;
