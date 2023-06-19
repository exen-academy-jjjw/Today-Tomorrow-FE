import React from "react";
import { useNavigate } from "react-router-dom";
import {BsBucketFill} from "react-icons/bs"
import "./mainStyle.scss"

function Main() {
    const navigate = useNavigate();

    return (
        <>
            <div className="mainBg">
                <div className="mainBox">
                    <div className="mainTitle">
                        <BsBucketFill id="icon"/>
                        <h1>Bucket</h1>
                    </div>
                    <div className="mainBtn">
                        <button onClick={() => navigate('/member/login')}>login</button>
                        <button onClick={() => navigate('/member/signup')}>join</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;