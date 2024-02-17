import React from "react";
import Block from "./Common/Block";
import Heading from "./Common/Heading";
import InfoList from "./Common/InfoList";

const PersonInfoList = () => {
  return (
    <>
      <Block>
        <Heading tag={"h2"} text={"Profile"} size={"small"} />
        <InfoList />
      </Block>
    </>
  );
};

export default PersonInfoList;
