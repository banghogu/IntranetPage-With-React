import React from "react";
import { useNavigate } from "react-router-dom";
import PostBoard from "../components/PostComponents/PostBoard";
import BoardGallery from "../components/PostComponents/BoardGallery";

import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";

const Notice = () => {
  const navigate = useNavigate();

  const goToAddPost = () => {
    // navigate 함수를 사용하여 경로를 변경
    navigate("/notice/AddPost");
  };

  return (
    <div className="notice__wrapper">
      <Block>
        <div className="align both vm">
          <Heading tag={"h2"} text={"FourUnity Notice"} size={"small"} />
          <button className="btn regular primary " onClick={goToAddPost}>
            글 등록
          </button>
        </div>
        <div className="mt30">
          <BoardGallery pagination={true} />
        </div>
      </Block>
    </div>
  );
};

export default Notice;
