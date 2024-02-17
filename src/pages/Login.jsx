import React, { useState } from "react";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Text from "../components/Common/Text";
import Input from "../components/Form/Input";
import Button from "../components/Common/Button";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setError("모든 필드를 입력해 주세요.");
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/main");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login__wrapper">
      <Block className="login">
        <Heading size={"regular"} tag={"h1"} text={"Login"} />
        <Text text={"로그인을 하시려면 이메일과 비밀번호를 입력하세요."} type={"type1"} />
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <Input onChange={onChange} width={"100%"} id="email" type="email" name="email" required />
          <label htmlFor="password">Password</label>
          <Input
            onChange={onChange}
            width={"100%"}
            id="password"
            name="password"
            type="password"
            required
          />
          <Button
            type="submit"
            className={"btn regular primary"}
            text={loading ? "Loading..." : "Login"}
          />
        </form>
        {error !== "" ? <div className="error"> {error}</div> : null}
        <div className="join-wrap">
          <Text text={"계정이 없으시다면 회원가입을 해주세요."} type={"type2"} />
          <Link to="/join">
            <Button className={"btn regular white"} text="Join" />
          </Link>
          <Text
            text={"비밀번호가 기억나지 않는다면 비밀번호 찾기를 클릭해주세요."}
            type={"type2"}
          />
          <Link to="/findpassword">
            <Button className={"btn regular white"} text="비밀번호 찾기" />
          </Link>
        </div>
      </Block>
    </div>
  );
};

export default Login;
