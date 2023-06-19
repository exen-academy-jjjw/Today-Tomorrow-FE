import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNickname } from "../../modules/redux/myPageSlice.js";

import "./css/modalStyle.scss";

const NicknameModal = ({ closeNickname, nick }) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState(nick);

  const updateNick = () => {
    dispatch(updateNickname(nickname))
      .then((response) => {
        window.alert('닉네임이 성공적으로 업데이트되었습니다.');
        closeNickname();
      })
      .catch((error) => {
        console.error("닉네임 업데이트 중에 오류가 발생했습니다.", error);
      });
  };

  const onChangeNick = (e) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <div className="modalBox">
        <h2>닉네임변경</h2>
        <div>
          <input
            type="text"
            className="nicknameInput"
            name="nickname"
            value={nickname}
            onChange={onChangeNick}
            placeholder="수정할 닉네임을 입력해주세요"
          />
        </div>
        <div className="modalBtnBox">
          <button className="updateBut" onClick={updateNick}>
            수정
          </button>
          <button className="cancelBut" onClick={closeNickname}>
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default NicknameModal;
