import React from "react";
import "./Board.scss";
import BoardCard from "./BoardCard";
import BoardList from "./BoardList";
import Heading from "../Common/Heading";
import Block from "../Common/Block";

const Board = ({ type, headingTag, headingText }) => {
  const BoardTypes = (type) => {
    if (type === "card") {
      return <BoardCard types={type} />;
    } else if (type === "list") {
      return <BoardList types={type} />;
    }
  };

  return (
    <>
      <Block className={"board-wrap"}>
        <Heading tag={headingTag} size={"small"} text={headingText} />
        {BoardTypes(type)}
      </Block>
    </>
  );
};

export default Board;
