import React, { useState } from 'react'
import Block from '../Common/Block'
import ProfileEdit from '../Common/ProfileEdit'
import Profile from '../Common/Profile'
import Badge from '../Common/Badge'
import Button from '../Common/Button'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Dialog from '../Common/Dialog'
import bgMypage from "../../assets/bg_mypage.png";

const MypageInfo = ({
    user,
    name,
    shortInfo,
    userEmail,
    userPhone,
    userJob,
    userImg,
    workStartTime,
    workEndTime,
    userBg,
    setWorkStartTime,
    setWorkEndTime

}) => {

    //모달에 관한 state
    const [modal, setModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);

    const workStart = async () => {
        if (!user) return;
        const today = new Date();
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
        setWorkStartTime(formattedTime);
        const userDocRef = doc(db, 'workingtimeline', user.uid, user.displayName, formattedDate);
        await setDoc(userDocRef, {
            startTime: formattedTime
        }, { merge: true });
    }

    const workEnd = async () => {
        if (!user) return;
        const today = new Date();
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
        setWorkEndTime(formattedTime);
        const userDocRef = doc(db, 'workingtimeline', user.uid, user.displayName, formattedDate);
        await setDoc(userDocRef, {
            endTime: formattedTime
        }, { merge: true });
    }

    return (
        <Block className="mypage__wrapper">
            <div className="mypage__bg">
                <img src={userBg || bgMypage} alt="" />
            </div>
            <div className="mypage__inner">
                <div className="mypage__profile">
                    <ProfileEdit>
                        <Profile userImg={userImg} />
                    </ProfileEdit>
                    <div className="mypage__name">{name}</div>
                    {shortInfo ? <div className="mypage__memo">{shortInfo}</div> : <div className="mypage__memo">소개글을 등록 해주세요</div>}
                </div>
                <div className="mypage__info">
                    <ul>
                        <li>
                            <strong>이메일</strong>
                            <div>{userEmail}</div>
                        </li>
                        <li>
                            <strong>전화번호</strong>
                            {userPhone ? <div>{userPhone}</div> : <div >-</div>}
                        </li>
                        <li>
                            <strong>직급</strong>
                            {userJob ? <div>{userJob}</div> : <div >-</div>}
                        </li>
                        <li aria-hidden="true"></li>
                        <li>
                            <strong>출근시간</strong>
                            {workStartTime ? <div>{workStartTime}</div> : <div >-</div>}
                        </li>
                        <li>
                            <strong>퇴근시간</strong>
                            {workEndTime ? <div>{workEndTime}</div> : <div >-</div>}
                        </li>
                        <li>
                            <strong>근태상태</strong>
                            <div>
                                {workStartTime === "" && workEndTime === "" && (
                                    <Badge situation={"primary"} text={"근무 전"} />
                                )}
                                {workStartTime !== "" && workEndTime === "" && (
                                    <Badge situation={"success"} text={"근무 중"} />
                                )}
                                {workStartTime !== "" && workEndTime !== "" && (
                                    <Badge situation={"danger"} text={"근무 종료"} />
                                )}

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="mypage__status">
                    {workStartTime === "" && workEndTime === "" && (
                        <>
                            <Button className={"btn primary regular"} text="근무시작" onClick={() => { setAlertModal(true); }} />
                            <Dialog openModal={alertModal} closeModal={() => setAlertModal(false)} className={"alert"}>
                                <div className="txt-center"> 근무를 시작하시겠습니까? </div>
                                <div className="align center mt20">
                                    <Button className={"btn regular primary"} text="확인"
                                        onClick={() => {
                                            workStart()
                                            setAlertModal(false);
                                        }} />
                                    <Button
                                        className={"btn regular danger"}
                                        text="취소"
                                        type="button"
                                        onClick={() => {
                                            setAlertModal(false);
                                        }}
                                    />
                                </div>
                            </Dialog>
                        </>
                    )}

                    {workStartTime !== "" && workEndTime === "" && (
                        <>
                            <Button className={"btn danger regular"} text="근무종료" onClick={() => { setAlertModal(true); }} />
                            <Dialog openModal={alertModal} closeModal={() => setAlertModal(false)} className={"alert"}>
                                <div className="txt-center"> 근무를 종료하시겠습니까? </div>
                                <div className="align center mt20">
                                    <Button className={"btn regular primary"} text="확인"
                                        onClick={() => {
                                            workEnd()
                                            setAlertModal(false);
                                        }} />
                                    <Button
                                        className={"btn regular danger"}
                                        text="취소"
                                        type="button"
                                        onClick={() => {
                                            setAlertModal(false);
                                        }}
                                    />
                                </div>
                            </Dialog>
                        </>
                    )}
                    {workStartTime !== "" && workEndTime !== "" && (
                        <>
                            <Button className={"btn primary regular"} text="근무시작" disabled />
                        </>
                    )}
                </div>
            </div>
        </Block>
    )
}

export default MypageInfo
