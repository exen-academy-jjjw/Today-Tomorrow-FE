import "./signupPageStyle.scss"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../../modules/redux/signupSlice";
import { useState } from "react";

function SignupPage() {
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({
        "memberId" : "",
        "nickname" : "",
        "password" : "",
        "passwordConfirm" : "",
      });
    
    const[message,setMessage] = useState("")
    const dispatch = useDispatch();
    const payload = {
        signupInfo: signupInfo,
        navigate: navigate
      }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(signupInfo.password !== signupInfo.passwordConfirm) {
            return;
        }
        dispatch(postSignup(payload));
      }
    
    const onChangeCheck = (e) => {
    if(signupInfo.password !== signupInfo.passwordConfirm) {
        setMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else {
        setMessage("");
    }
    };

    const onChangeHandler = (e) => {
    setSignupInfo((info) => ({...info, [e.target.name] : e.target.value}));
    };

    return (
        <>
            <div className="signupBg">
                <div className="signupBox">
                    <h2>회원가입</h2>
                    
                    <form onSubmit={onSubmitHandler}>
                        <input name="memberId" placeholder="ID" onChange={onChangeHandler}/>
                        <input name="nickname" placeholder="Nickname" onChange={onChangeHandler}/>
                        <input type="password" name="password" placeholder="password" onChange={onChangeHandler}/>
                        <input type="password" name="passwordConfirm" placeholder="passwordConfirm" onChange={onChangeHandler} onKeyUp={onChangeCheck}/>
                        {message !== "" ? <p style={{color:"red", textAlign:"center", fontSize:"0.75rem"}}>{message}</p> : null}
                        <button type="submit">Sign up</button>
                    </form>
                    <p style={{textAlign:"center"}}>이미 회원이신가요? <a href="/member/login">로그인하러 가기</a></p>
                </div>
            </div>
        </>
    )
}

export default SignupPage;