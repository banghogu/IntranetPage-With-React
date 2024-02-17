import React from "react";
import Profile from "../Common/Profile";
import pic1 from "../../assets/profile1.jpg";
import Block from "../Common/Block";
import Button from "../Common/Button";

const BoardCard = ({ types }) => {
  return (
    <div className={types}>
      <ul className={"board"}>
        <li>
          <Block>
            <a href="">
              <Profile filename={pic1} />
              <div className="board__status">출근전</div>
              <div className="board__title">제목</div>
              <div className="board__writer">작성자</div>
            </a>
            <div className="board__more">
              <Button className={"btn-more"} />
              <dialog open>
                <ul>
                  <li>
                    <button>수정</button>
                  </li>
                  <li>
                    <button>삭제</button>
                  </li>
                </ul>
              </dialog>
            </div>
          </Block>
        </li>
      </ul>
    </div>
  );
};

export default BoardCard;
