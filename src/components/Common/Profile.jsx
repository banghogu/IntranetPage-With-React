import React from "react";
import "./Profile.scss";

const Profile = ({ userImg, className = "" }) => {
  return (
    <div className={"profile " + className}>
      <img src={userImg} alt="" />
    </div>
  );
};

export default Profile;

