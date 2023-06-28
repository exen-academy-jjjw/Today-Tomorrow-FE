import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../modules/redux/loginSlice";
import { getCookie, removeCookie } from "../cookie/cookie";
import {BsBucketFill} from "react-icons/bs";
import "./mainStyle.scss"

function ExitBeforeMain() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem("accesstoken") || (getCookie("refreshtoken") && getCookie("nickname"))) {
            dispatch(logout()).then(() =>{
                navigate('/main');
            });
        } else {
            navigate('/main');
        }
        
    }, []);

    return (
        <>
          <div className="mainBg">
                <div className="mainBox">
                    <div className="mainTitle">
                        <BsBucketFill id="icon"/>
                        <h1>Bucket</h1>
                    </div>
                    <div className="mainBtn">
                        <button>login</button>
                        <button>join</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExitBeforeMain;