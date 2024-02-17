import React, { useState } from "react";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Text from "../components/Common/Text";
import Input from "../components/Form/Input";
import Button from "../components/Common/Button";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Join = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (name === "" || email === "" || password === "") {
      setError("모든 필드를 입력해 주세요.");
      return;
    }
    try {
      setLoading(true);
      const createID = await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth);
      await updateProfile(createID.user, {
        displayName: name,
      });

      navigate("/");
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
        <Heading size={"regular"} tag={"h1"} text={"Join"} />
        <Text text={"회원가입을 하시려면 아래의 내용을 입력해주세요."} type={"type1"} />
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <Input onChange={onChange} width={"100%"} id="name" name="name" type="text" required />
          <label htmlFor="email">Email</label>
          <Input onChange={onChange} width={"100%"} id="email" name="email" type="email" required />
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
            text={loading ? "Loading..." : "Join"}
          />
        </form>
        {error !== "" ? <div className="error">{error}</div> : null}
        <div className="join-wrap">
          <Text text={"계정이 있다면, 로그인을 해주세요."} type={"type2"} />
          <Link to="/login">
            <Button className={"btn regular success"} text="Login" />
          </Link>
        </div>
      </Block>
    </div>
  );
};

export default Join;
