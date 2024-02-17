import React from "react";
import "./Board.scss";
import BoardCard from "./BoardCard";
import BoardList from "./PostList";
import Heading from "../Common/Heading";
import Block from "../Common/Block";
import { useNavigate } from 'react-router-dom';

const PostBoard = ({ type, headingTag, headingText }) => {
  const BoardTypes = (type) => {
    if (type === "card") {
      return <BoardCard types={type} />;
    } else if (type === "list") {
      return <BoardList types={type} />;
    }
  };

  const navigate = useNavigate();

  const goToAddPost = () => {
    // navigate 함수를 사용하여 경로를 변경
    navigate('/notice/AddPost');
  };

  return (
    <>
      <Block className={"board-wrap"}>
        <div className="align both">
          <Heading tag={headingTag} size={"small"} text={headingText} />
          <button className="btn regular primary " onClick={goToAddPost}>글 등록</button>
        </div>

        {BoardTypes(type)}
      </Block>
    </>
  );
};

export default PostBoard;
