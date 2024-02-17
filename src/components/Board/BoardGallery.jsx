import React from "react";
import Profile from "../Common/Profile";
import pic1 from "../../assets/profile1.jpg";
import Block from "../Common/Block";
import Button from "../Common/Button";

const BoardGallery = () => {
  return (
    <div className={"gallery"}>
      <ul className={"board"}>
        <li>
          <Block>
            <a href="">
              <img src={pic1} alt="" />
              <div className="gallery__info">
                <div className="board__title">제목</div>
                <div className="board__content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit corporis, quia eaque,
                  vero doloribus quod non doloremque veritatis tempora atque cum fugit illo
                  voluptatibus dolores exercitationem pariatur similique animi quis?
                </div>
                <div className="board__writer">작성자</div>
              </div>
            </a>
          </Block>
        </li>
        <li>
          <Block>
            <a href="">
              <img src={pic1} alt="" />
              <div className="gallery__info">
                <div className="board__title">제목</div>
                <div className="board__content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit corporis, quia eaque,
                  vero doloribus quod non doloremque veritatis tempora atque cum fugit illo
                  voluptatibus dolores exercitationem pariatur similique animi quis?
                </div>
                <div className="board__writer">작성자</div>
              </div>
            </a>
          </Block>
        </li>
        <li>
          <Block>
            <a href="">
              <img src={pic1} alt="" />
              <div className="gallery__info">
                <div className="board__title">제목</div>
                <div className="board__content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit corporis, quia eaque,
                  vero doloribus quod non doloremque veritatis tempora atque cum fugit illo
                  voluptatibus dolores exercitationem pariatur similique animi quis?
                </div>
                <div className="board__writer">작성자</div>
              </div>
            </a>
          </Block>
        </li>
        <li>
          <Block>
            <a href="">
              <img src={pic1} alt="" />
              <div className="gallery__info">
                <div className="board__title">제목</div>
                <div className="board__content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit corporis, quia eaque,
                  vero doloribus quod non doloremque veritatis tempora atque cum fugit illo
                  voluptatibus dolores exercitationem pariatur similique animi quis?
                </div>
                <div className="board__writer">작성자</div>
              </div>
            </a>
          </Block>
        </li>
      </ul>
    </div>
  );
};

export default BoardGallery;
