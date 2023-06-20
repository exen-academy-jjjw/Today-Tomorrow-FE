import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../cookie/cookie";

export const PrivateRoute = () => {
  const access = getCookie('refreshtoken');
  const location = useLocation();

  if (!access) {
    const path = location.pathname;
    if (path !== `/member/login`) {
      window.location.replace('/member/login');
    }
    return null;
  }

  return <Outlet />;
};


