import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { memberDelete } from "../../modules/redux/myPageSlice";

const UnregisterModal = ({ openCloseModal, password, setPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const payload = {
    data : {
      password : password
    },
    navigate : navigate
  }
  console.log(password);

  const memberOut = () => {
    dispatch(memberDelete(payload));
    setPassword("");
    openCloseModal();
  };

  return (
    <>
      <div className="unregisterModalBox">
        <h2>정말 탈퇴하시겠습니까?</h2>
        <div className="modalBtnBox">
          <button className="unregisterBut" onClick={memberOut}>
            확인
          </button>
          <button className="cancelBut" onClick={openCloseModal}>
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default UnregisterModal;
