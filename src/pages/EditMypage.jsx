import React, { useEffect, useState } from "react";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Input from "../components/Form/Input";
import AddFile from "../components/Form/AddFile";
import Button from "../components/Common/Button";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Dialog from "../components/Common/Dialog";
import Loading from "../components/Common/Loading";
import "./EditMypage.scss";

const EditMypage = () => {
  const [name, setName] = useState(""); //사용자 이름
  const [shortInfo, setShortInfo] = useState(""); //사용자 한줄소개
  const [userEmail, setUserEmail] = useState(""); //사용자 이메일
  const [userPhone, setUserPhone] = useState(""); //사용자 전화번호
  const [userJob, setUserJob] = useState(""); //사용자 직급
  const [userImgFile, setUserImgFile] = useState(null);
  const [userBgFile, setUserBgFile] = useState(null);

  //모달에 관한 state`
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const { displayName, email } = user;
        setName(displayName || "");
        setUserEmail(email || "");

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        const userShortInfo = userDoc.data()?.shortInfo;
        const userPhone = userDoc.data()?.phoneNumber;
        const userJob = userDoc.data()?.job;

        setShortInfo(userShortInfo);
        setUserPhone(userPhone);
        setUserJob(userJob);
      }
    };
    fetchData();
  }, []);

  const handleShortInfo = (e) => {
    const { value } = e.target;
    setShortInfo(value);
  };
  const handlePhone = (e) => {
    const { value } = e.target;
    setUserPhone(value);
  };
  const handleJob = (e) => {
    const { value } = e.target;
    setUserJob(value);
  };
  const userImgChange = async (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setUserImgFile(files[0]);
    }
  };
  const userBgChange = async (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setUserBgFile(files[0]);
    }
  };

  const edit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userDocRef = doc(db, "users", user.uid);
    try {
      if (shortInfo) {
        await setDoc(
          userDocRef,
          {
            shortInfo: shortInfo,
          },
          { merge: true }
        );
      }

      if (userPhone) {
        await setDoc(
          userDocRef,
          {
            phoneNumber: userPhone,
          },
          { merge: true }
        );
      }

      if (userJob) {
        await setDoc(
          userDocRef,
          {
            job: userJob,
          },
          { merge: true }
        );
      }

      if (userImgFile) {
        const locationRef = ref(storage, `UserImage/${user.displayName}`);
        const result = await uploadBytes(locationRef, userImgFile);
        const userImgUrl = await getDownloadURL(result.ref);
        await updateProfile(user, {
          photoURL: userImgUrl,
        });
        await setDoc(
          userDocRef,
          {
            photoURL: userImgUrl,
          },
          { merge: true }
        );
      }

      if (userBgFile) {
        const locationRef = ref(storage, `UserBg/${user.displayName}`);
        const result = await uploadBytes(locationRef, userBgFile);
        const userBgUrl = await getDownloadURL(result.ref);
        await setDoc(
          userDocRef,
          {
            bg: userBgUrl,
          },
          { merge: true }
        );
      }
      navigate("/mypage");
    } catch (error) {
      console.error(error);
    }
  };

  const checkType = () => {
    if (!shortInfo || !userPhone || !userJob) {
      setAlertModal(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed">
          <Loading />
        </div>
      ) : (
        <form onSubmit={edit}>
          <Block className="form-type1">
            <Heading tag={"h2"} size={"small"} text={"회원 정보 수정"} />

            <label htmlFor="name">Name</label>
            <Input width={"100%"} id="name" type="text" disabled value={name || ""} />

            <label htmlFor="email">Email</label>
            <Input width={"100%"} id="email" type="email" disabled value={userEmail || ""} />

            <label htmlFor="introduce">한줄소개</label>
            <Input width={"100%"} id="introduce" type="text" placehodler="한줄소개를 입력해주세요." value={shortInfo || ""} onChange={handleShortInfo} required />

            <label htmlFor="tel">전화번호</label>
            <Input width={"100%"} id="tel" type="tel" placeholder="숫자만 입력해주세요." value={userPhone || ""} onChange={handlePhone} required />

            <label htmlFor="job">직급</label>
            <Input width={"100%"} id="job" type="text" placeholder="직급을 입력해주세요." value={userJob || ""} onChange={handleJob} required />

            <label htmlFor="">프로필사진</label>
            <AddFile id={"file2_1"} text={userImgFile ? "파일이 추가되었습니다" : "첨부파일"} onChange={userImgChange} />

            <label htmlFor="">배경사진</label>
            <AddFile id={"file2_2"} text={userBgFile ? "파일이 추가되었습니다" : "첨부파일"} onChange={userBgChange} />

            <div className="align center">
              <Button
                className={"btn regular primary"}
                text="회원정보수정"
                type="button"
                onClick={() => {
                  setAlertModal(true);
                }}
              />
            </div>

            <Dialog openModal={alertModal} closeModal={() => setAlertModal(false)} className={"alert"}>
              <div className="txt-center"> 회원 정보를 수정 하시겠습니까? </div>
              <div className="align center mt20">
                <Button className={"btn regular primary"} text="확인" type="submit" onClick={checkType} />
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
          </Block>
        </form>
      )}
    </>
  );
};

export default EditMypage;
