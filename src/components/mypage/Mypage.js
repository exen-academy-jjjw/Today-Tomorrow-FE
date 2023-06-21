import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NicknameModal from "../modal/NicknameModal";
import PasswordModal from "../modal/PasswordModal";
import Header from '../header/Header.js';
import { getMypageInfo } from "../../modules/redux/myPageSlice.js";

import "./css/mypageStyle.scss";

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nicknameModal, setNicknameModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [modalBg, setModalBg] = useState(false);

  const openCloseNickname = () => {
    setNicknameModal(!nicknameModal);
    setModalBg(!modalBg);
  };

  const openClosePW = () => {
    setPasswordModal(!passwordModal);
    setModalBg(!modalBg);
  };

  const { isLoading, error, info } = useSelector((state) => state?.myPageSlice);

  useEffect(() => {
    dispatch(getMypageInfo());
  }, [nicknameModal, passwordModal]);

  if (isLoading) {
    return <div>로딩중....</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="pageBg">
          <Header />
        <div className="myPageBox">
          {modalBg ? <div className="modalsBg"></div> : null}
          <div>
            <h2 style={{ textAlign: "center" }}>마이 페이지</h2>
            <section className="bucketCountBox">
              <div className="bucketCountDesc">
                <p>
                  <span className="bucketPlanTxt">{info?.unCompleteCount}</span>{" "}
                  <span className="bucketCountTxt">예정</span>
                </p>
                <p>
                  <span className="bucketClearTxt">{info?.completeCount}</span>{" "}
                  <span className="bucketCountTxt">완료</span>
                </p>
              </div>
              <div className="bucketCountTotal">
                <p>
                  <span className="bucketCountTxt">total</span>{" "}
                  <span className="bucketTotalTxt">{info?.totalCount}</span>
                </p>
              </div>
            </section>
            <section className="myInfoBox">
              <div className="updateInfoBox">
                <p className="updateInfoTxt">닉네임 변경</p>
                <button className="updateBtn" onClick={openCloseNickname}>
                  update
                </button>
              </div>
              <div className="updateInfoBox">
                <p className="updateInfoTxt">비밀번호 변경</p>
                <button className="updateBtn" onClick={openClosePW}>
                  update
                </button>
              </div>
              <p
                className="unregisterBtn"
                onClick={() => navigate("/mypage/unregister")}
              >
                회원탈퇴
              </p>
            </section>
            <div className="mainBtnBox">
              <button onClick={() => navigate(`/post/list?page=0&size=7`)}>list</button>
            </div>
          </div>
          {nicknameModal ? (
            <NicknameModal closeNickname={openCloseNickname} nick={info?.nickname}/>
          ) : null}
          {passwordModal ? <PasswordModal openClosePW={openClosePW} /> : null}
        </div>
      </div>
    </>
  );
};

export default Mypage;
