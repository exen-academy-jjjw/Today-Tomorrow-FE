import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../cookie/cookie";

export const PrivateRoute = () => {
  const access = getCookie('refreshtoken');
  const location = useLocation();

  if (!access) {
    const path = location.pathname;
    if (path !== `/member/login`) {
      window.alert("로그인이 필요한 서비스입니다.");
      window.location.replace('/member/login');
    }
    return null;
  }

  return <Outlet />;
};


