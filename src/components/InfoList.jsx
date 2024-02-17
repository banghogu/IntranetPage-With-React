import React from "react";
import "./InfoList.scss";

const InfoList = ({
  userEmail,
  userPhone,
  userJob,
  isUserPhone,
  isUserJob,
  initUserPhone,
  initUserJob}) => {
    
  return (
    <ul className="info-list">
      
      <li className="tel">
        <strong className="info-list__title">Phone</strong>
        {isUserPhone ?  <div className="info-list__content">{userPhone}</div> : <div style={{ color: '#DC6089', fontSize: '1.3rem' }} className="info-list__content">{initUserPhone}</div>}
      </li>
      <li className="job">
        <strong className="info-list__title">Job</strong>
        {isUserJob ?  <div className="info-list__content">{userJob}</div> : <div style={{ color: '#DC6089', fontSize: '1.3rem' }} className="info-list__content">{initUserJob}</div>}
      </li>
      <li className="email">
        <strong className="info-list__title">Email</strong>
        <div className="info-list__content">{userEmail}</div>
      </li>
    </ul>
  );
};

export default InfoList;
