import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "../cookie/cookie";

export const PrivateRoute = () => {
  const access = getCookie('refreshtoken');

  const restrictedPaths = ['/', '/member/signup', '/member/login'];
  const path = window.location.pathname;

  if (!access) {
    window.alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/member/login" replace />;
  } 
  // else if (access && restrictedPaths.includes(path)) {
  //   return <Navigate to="/post/list" replace />;
  // }

  return <Outlet />;
};