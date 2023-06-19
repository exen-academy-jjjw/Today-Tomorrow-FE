import "./loginPageStyle.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogin } from "../../modules/redux/loginSlice";
import { useState } from "react";

function LoginPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const [loginInfo, setLoginInfo] = useState({
      "memberId" : "",
      "password" : ""
    });

    const payload = {
      loginInfo: loginInfo,
      navigate: navigate
    };

  
    const onSubmitHandler = async (e) => {
      e.preventDefault();
  
      sessionStorage.removeItem("login");
      
      try {
        dispatch(postLogin(payload));
      } catch (error) {
        console.error(error);
      }
    }

    const onChangeHandler = (e) => {
      setLoginInfo((info) => ({...info, [e.target.name] : e.target.value}));
    };
  
    return(
      <>
        <div className="loginBg">
          <div className="loginBox">
            <h2>로그인</h2>
            <form onSubmit={onSubmitHandler}>
              <input name="memberId" placeholder="ID" onChange={onChangeHandler}/>
              <input type="password" name="password" placeholder="Password" onChange={onChangeHandler}/>
              <button type="submit">Log In</button>
            </form>
            <p style={{textAlign:"center"}}>아직 회원이 아니신가요? <a href="/member/signup">회원가입하러 가기</a></p>
          </div>
        </div>
      </>
    )
  }
  
  export default LoginPage;