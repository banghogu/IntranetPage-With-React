import React, { useState } from "react";
import Heading from "../components/Common/Heading";
import Block from "../components/Common/Block";
import Board from "../components/Board/Board";
import Profile from "../components/Common/Profile";
import pic1 from "../assets/profile1.jpg";
import BusinessCard from "../components/BusinessCard";
import Text from "../components/Common/Text";
import Dialog from "../components/Common/Dialog";
import Button from "../components/Common/Button";
import Badge from "../components/Common/Badge";
import Input from "../components/Form/Input";
import Select from "../components/Form/Select";
import { testOption } from "../data/selectOption";
import Textarea from "../components/Form/Textarea";
import Checkbox from "../components/Form/Checkbox";
import PersonInfoList from "../components/PersonInfoList";
import TimeBlock from "../components/TimeBlock";
import Radio from "../components/Form/Radio";
import AddFile from "../components/Form/AddFile";
import ProfileEdit from "../components/Common/ProfileEdit";
import InputDate from "../components/Form/InputDate";
import bgMypage from "../assets/bg_mypage.png";
import BoardGallery from "../components/Board/BoardGallery";
import Pagination from "../components/Common/Pagination";
import "./Mypage.scss";


const StyleGuide = () => {
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [ischecked, setIschecked] = useState(true);
  const [isRadio, setIsRadio] = useState("option1");

  const nullOption = () => {
    return "";
  };
  const onChange = () => {
    setIschecked(!ischecked);
  };

  const radioChange = (e) => {
    setIsRadio(e.target.value);
  };

  return (
    <div>
      <Heading tag={"h2"} size={"large"} text={"large"} />
      <Heading tag={"h2"} size={"regular"} text={"regular"} />
      <Heading tag={"h2"} size={"small"} text={"small"} />

      <hr />

      <Text type={"type1"} text={"type1"} />
      <Text type={"type2"} text={"type2"} />

      <hr />

      <Button className={"btn regular primary"} text="btn regular primary" />
      <Button className={"btn regular danger"} text="btn regular danger" />
      <Button className={"btn regular success"} text="btn regular success" />
      <Button className={"btn regular white"} text="btn regular white" />
      <br />
      <Button className={"btn small primary"} text="btn small primary" />
      <Button className={"btn small danger"} text="btn small danger" />
      <Button className={"btn small success"} text="btn small success" />
      <Button className={"btn small white"} text="btn small white" />
      <br />
      <Button className={"btn xsmall primary"} text="btn xsmall primary" />
      <Button className={"btn xsmall danger"} text="btn xsmall danger" />
      <Button className={"btn xsmall success"} text="btn xsmall success" />
      <Button className={"btn xsmall white"} text="btn xsmall white" />
      <br />
      <Badge situation={"primary"} text={"primary"} />
      <Badge situation={"danger"} text={"danger"} />
      <Badge situation={"success"} text={"success"} />
      <Badge situation={"light"} text={"light"} />
      <Badge situation={"dark"} text={"dark"} />
      <br />
      <br />
      <Pagination />
      <div className="align center">
        <Pagination />
      </div>
      <div className="align right">
        <Pagination />
      </div>

      <hr />

      <Block>block</Block>

      <hr />

      {/* 파일은 import해서 적용해야함. */}
      <Profile filename={pic1} />
      <ProfileEdit>
        <Profile filename={pic1} />
      </ProfileEdit>

      <hr />

      <BusinessCard />

      <hr />

      {/* 
        종류 : card, list 
      */}
      <Board type={"card"} headingTag={"h2"} headingText={"Card List"} />
      <Board type={"list"} headingTag={"h2"} headingText={"Board List"} />
      <BoardGallery />

      <hr />

      <Button
        className={"btn regular primary"}
        text="팝업열기"
        onClick={() => {
          setModal(true);
        }}
      />
      <Dialog openModal={modal} closeModal={() => setModal(false)} title={"popuptitle"}>
        팝업내용
      </Dialog>

      <Button
        className={"btn regular primary"}
        text="경고창"
        onClick={() => {
          setAlertModal(true);
        }}
      />

      <Dialog openModal={alertModal} closeModal={() => setAlertModal(false)} className={"alert"}>
        <div className="txt-center">알림내용을 입력하세요.</div>
        <div className="align center mt20">
          <Button className={"btn regular primary"} text="확인" />
          <Button
            className={"btn regular danger"}
            text="취소"
            onClick={() => {
              setAlertModal(false);
            }}
          />
        </div>
      </Dialog>

      <hr />

      <Input width={"20rem"} />
      <br />
      <Select placeholder={"선택하세요"} options={testOption} onChange={nullOption} />
      <br />
      <Textarea width={"100%"} height={"10rem"} />
      <br />
      <InputDate placehodler={"시작일"} />
      <br />
      <br />
      <Checkbox
        type={"type1"}
        id={"chk1_1"}
        text="선택하세요"
        checked={ischecked}
        onChange={onChange}
      />
      <Checkbox type={"type1"} id={"chk1_2"} text="선택하세요" />
      <br />
      <Radio
        type={"type1"}
        name="rag"
        id={"ra1_1"}
        text="선택1"
        value="option1"
        checked={isRadio === "option1"}
        onChange={radioChange}
      />
      <Radio
        type={"type1"}
        name="rag"
        id={"ra1_2"}
        text="선택2"
        value="option2"
        checked={isRadio === "option2"}
        onChange={radioChange}
      />
      <AddFile id={"file1_1"} text="첨부파일" />
      <hr />

      <PersonInfoList />
      <TimeBlock time={"11:00:20"} title={"현재시각"} icon={"ico1"} />
      <TimeBlock time={"11:00:20"} title={"근무종료"} icon={"ico2"} />
      <TimeBlock time={"11:00:20"} title={"근무시각"} icon={"ico3"} />
      <TimeBlock time={"11:00:20"} title={"현재시각"} icon={"ico4"} />

      <hr />

      <Block className="mypage__wrapper">
        <div className="mypage__bg">
          <img src={bgMypage} alt="" />
        </div>
        <div className="mypage__inner">
          <div className="mypage__profile">
            <ProfileEdit>
              <Profile />
            </ProfileEdit>
            <div className="mypage__name">홍길동</div>
            <div className="mypage__memo">한 줄 소개글이 등록되어 있지 않습니다.</div>
          </div>
          <div className="mypage__info">
            <ul>
              <li>
                <strong>이메일</strong>
                <div>123@123.com</div>
              </li>
              <li>
                <strong>전화번호</strong>
                <div>010-1234-1234</div>
              </li>
              <li>
                <strong>직급</strong>
                <div>-</div>
              </li>
              <li aria-hidden="true"></li>
              <li>
                <strong>출근시간</strong>
                <div>09:20</div>
              </li>
              <li>
                <strong>퇴근시간</strong>
                <div>09:20</div>
              </li>
              <li>
                <strong>근태상태</strong>
                <div>
                  <Badge situation={"success"} text={"근무중"} />
                </div>
              </li>
            </ul>
          </div>
          <div className="mypage__status">
            <Button className={"btn regular primary"} text="근무시작" />
            <Button className={"btn regular danger"} text="근무종료" disabled />
          </div>
        </div>
      </Block>
      <Board type={"list"} headingTag={"h2"} headingText={"나의 근태현황"} />

      <Block className="form-type1">
        <Heading tag={"h2"} size={"small"} text={"회원 정보 수정"} />
        <label htmlFor="name">Name</label>
        <Input width={"100%"} id="name" type="text" disabled value="현재이름" />
        <label htmlFor="email">Email</label>
        <Input width={"100%"} id="email" type="email" disabled value="123@123.com" />
        <label htmlFor="introduce">한줄소개</label>
        <Input width={"100%"} id="introduce" type="text" placehodler="한줄소개를 입력해주세요." />
        <label htmlFor="tel">전화번호</label>
        <Input width={"100%"} id="tel" type="tel" placeholder="숫자만 입력해주세요." />
        <label htmlFor="job">직급</label>
        <Input width={"100%"} id="job" type="text" placeholder="직급을 입력해주세요." />
        <label htmlFor="">프로필사진</label>
        <AddFile id={"file2_1"} text="첨부파일" />
        <label htmlFor="">배경사진</label>
        <AddFile id={"file2_2"} text="첨부파일" />
        <div className="align center">
          <Button className={"btn regular primary"} text="회원정보수정" />
        </div>
      </Block>
    </div>
  );
};

export default StyleGuide;
