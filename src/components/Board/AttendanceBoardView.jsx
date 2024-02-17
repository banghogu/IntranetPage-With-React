import React from "react";

const AttendanceBoardView = ({
  content,
  createdAt,
  startdate,
  enddate,
  select,
  title,
  userId,
  username,
  id,
}) => {
  console.log(content);
  return (
    <div>
      test
      <div>{select}</div>
      <div>{title}</div>
      <div>{content}</div>
      <div>{id}</div>
    </div>
  );
};

export default AttendanceBoardView;
