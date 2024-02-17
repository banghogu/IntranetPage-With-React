import React, { useState } from "react";
import Heading from "../Common/Heading";
import Block from "../Common/Block";
import Button from "../Common/Button";
import Input from "../Form/Input";
import Select from "../Form/Select";
import InputDate from "../Form/InputDate";
import { attendanceOption } from "../../data/selectOption";
import Textarea from "../Form/Textarea";
import { useNavigate } from "react-router";
import { auth, db } from "../../firebase";
import { addDoc, collection, getDoc, doc } from "@firebase/firestore";
import "./AttendanceBoardWrite.scss";

const AttendanceBoardWrite = () => {
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [select, setSelect] = useState("");
  const [content, setContent] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "select") {
      setSelect(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === "startdate") {
      setStartdate(value);
    } else if (name === "enddate") {
      setEnddate(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.uid);
    const userImgDoc = await getDoc(userDocRef);
    const userImg = userImgDoc.data()?.photoURL;

    if (!user || isloading || title === "" || select === "" || content === "" || startdate === "" || enddate === "") return;

    try {
      setIsloading(true);
      await addDoc(collection(db, "attendance"), {
        title,
        select,
        content,
        startdate,
        enddate,
        createdAt: Date.now(),
        username: user.displayName,
        userId: user.uid,
        userImg: userImg,
      });
    } catch (error) {
      console.log("onSubmit Error : ", error);
    } finally {
      setIsloading(false);
      navigate("/Attendance");
    }
  };

  const backList = () => {
    navigate("/Attendance");
  };
  return (
    <>
      <Block>
        <Heading tag={"h2"} size={"regular"} text={"근태신청"} />
        <form onSubmit={onSubmit}>
          <div className="attendance-write">
            <Input placeholder="제목을 입력하세요." name="title" onChange={onChange} required />
            <Select placeholder={"선택하세요"} options={attendanceOption} name="select" onChange={onChange} required />
            <Textarea rows="10" placeholder="사유를 입력하세요." name="content" onChange={onChange} />
            <div className="date-group">
              <InputDate name="startdate" onChange={onChange} required placehodler={"시작일"} />
              ~
              <InputDate name="enddate" onChange={onChange} required placehodler={"종료일"} />
            </div>
          </div>
          <div className="btn-group">
            <Button type="submit" className={"btn primary regular"} text={isloading ? "Loading..." : "신청하기"} />
            <Button className={"btn danger regular"} text="취소하기" onClick={backList} />
          </div>
        </form>
      </Block>
    </>
  );
};

export default AttendanceBoardWrite;
