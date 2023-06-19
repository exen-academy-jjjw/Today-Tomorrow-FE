import React, { useState } from "react";
import { BsBucketFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { logout } from "../../modules/redux/loginSlice";
import { useDispatch, useSelector } from "react-redux";

import "./css/headerStyle.scss";
import { MdPermIdentity } from "react-icons/md";
import { getCookie } from "../cookie/cookie";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const nickname = useSelector((state) => state.myPageSlice.nickname || getCookie("nickname"));
  const nickname = getCookie("nickname");

  const logoutHandler = () => {
      dispatch(logout());
      navigate('/');
  }


  return (
    <>
      <section className="headerBox">
        <div className="logoBox" onClick={() => navigate("/post/list")}>
          <BsBucketFill
            style={{ color: "orange", fontSize: "2rem", marginRight: "0.5rem" }}
          />
          <span className="logoTxt">Bucket</span>
        </div>
        <div className="logoutBox">
          <button onClick={() => navigate('/mypage')}>
            <MdPermIdentity id="icon" />
            {nickname && <p><span>{nickname}</span>님</p>}
          </button>
          <button
            className="logoutBnt"
            onClick={logoutHandler}
          >
            logout
          </button>
        </div>
      </section>
    </>
  );
};

export default Header;
