import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../modules/redux/myPageSlice.js";

import "./css/modalStyle.scss";

const PasswordModal = ({ openClosePW }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onChangeHandler = (event, setState) => {
    setState(event.target.value);
  };

  const onUpdatePW = (event) => {
    event.preventDefault();
    const payload = {
      password: password,
      newPassword: newPassword,
    };

    if (newPassword !== passwordConfirm) {
      window.alert("변경하실 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
 
    dispatch(updatePassword(payload))
      .then((response) => {
        console.log("진1");
        console.log(response);
        if(response.payload.data === 400) {
          window.alert("입력하신 기존 비밀번호가 다릅니다.");
        } else {
          window.alert("비밀번호가 성공적으로 변경되었습니다.");
          openClosePW();
        }
        
      })
      .catch((error) => {
        console.log("진2");
        console.error("비밀번호 업데이트 중에 오류가 발생했습니다.", error);
      });
  };

  return (
    <>
      <div className="modalBox">
        <h2>비밀번호변경</h2>
        <form onSubmit={onUpdatePW}>
          <input
            type="password"
            className="passwordInput"
            name="password"
            placeholder="현재 비밀번호"
            onChange={(e) => onChangeHandler(e, setPassword)}
          />
          <input
            type="password"
            className="passwordInput"
            name="newPassword"
            placeholder="변경할 비밀번호"
            onChange={(e) => onChangeHandler(e, setNewPassword)}
          />
          <input
            type="password"
            className="passwordInput"
            name="passwordConfirm"
            placeholder="변경할 비밀번호 확인"
            onChange={(e) => onChangeHandler(e, setPasswordConfirm)}
          />
          <div className="modalBtnBox">
            <button type="submit" className="updateBut">
              수정
            </button>
            <button className="cancelBut" onClick={openClosePW}>
              취소
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PasswordModal;