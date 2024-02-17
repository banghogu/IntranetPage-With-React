import React, { useState } from "react";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Text from "../components/Common/Text";
import Input from "../components/Form/Input";
import Button from "../components/Common/Button";
import "./Login.scss";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendMail, setSendMail] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "") {
      setError("회원가입하셨던 이메일을 입력해 주세요.");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
      setSendMail(true);
    }
  };
  return (
    <div className="login__wrapper">
      <Block className="login">
        <Heading size={"regular"} tag={"h1"} text={"Find Password"} />
        <Text text={"회원가입했던 이메일을 작성해주세요."} type={"type1"} />
        <Text text={"비밀번호 변경링크를 메일로 보내드립니다."} type={"type1"} />
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <Input onChange={onChange} width={"100%"} id="email" type="email" name="email" required />
          <Button
            type="submit"
            className={"btn regular primary"}
            text={loading ? "Loading..." : "비밀번호 찾기"}
          />
        </form>
        {error !== "" ? <div className="error"> {error}</div> : null}
        {sendMail && <div className="error">이메일이 발송되었습니다.</div>}
        <div className="join-wrap">
          <Text text={"로그인페이지 바로가기"} type={"type2"} />
          <Link to="/login">
            <Button className={"btn regular white"} text="Login" />
          </Link>
        </div>
      </Block>
    </div>
  );
};

export default FindPassword;
