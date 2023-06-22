import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "../cookie/cookie";

export const PrivateRoute = () => {
  const access = getCookie('refreshtoken');

  if (!access) {
    window.alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/member/login" replace />;
  }
  return <Outlet />;
};