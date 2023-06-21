import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnregisterModal from "../modal/UnregisterModal";

import "./css/mypageStyle.scss";
import { useEffect } from "react";

const Unregister = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [unregisterModal, setUnregisterModal] = useState(false);
  const [modalBg, setModalBg] = useState(false);

  const openCloseModal = () => {
    setUnregisterModal(!unregisterModal);
    setModalBg(!modalBg);
  };

  const onChangePW = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {modalBg ? <div className="modalsBg"></div> : null}
      <br />
      <div className="pageBg">
        <div className="unregisterBox">
          <h2 style={{ textAlign: "center" }}>회원 탈퇴</h2>
          <section className="unregisterTxt">
            <p>
              회원 탈퇴시 작성하신 버킷리스트가 삭제됩니다
              <br />
              또한 사이트를 이용하기 위해서는 재가입이 필요함을 알립니다
            </p>
          </section>
          <section className="myInfoBox">
            <input
              className="unregisterInput"
              type="password"
              name="password"
              onChange={onChangePW}
              value={password || ""}
              placeholder="비밀번호 입력"
            />
            <div className="unregisterBtnBox">
              <button className="unregisterBtn" onClick={openCloseModal}>
                회원탈퇴
              </button>
              <button className="cancelBut" onClick={() => navigate("/mypage")}>
                취소
              </button>
            </div>
          </section>
        </div>
        {unregisterModal ? (
          <UnregisterModal openCloseModal={openCloseModal} password={password} setPassword={setPassword}/>
        ) : null}
      </div>
    </>
  );
};

export default Unregister;
