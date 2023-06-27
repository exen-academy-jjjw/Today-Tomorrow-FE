import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "../cookie/cookie";

export const PrivateRouteTwo = () => {
  const access = getCookie('refreshtoken');
  const path = window.location.pathname;

  if (access && path === '/main') {
    return <Navigate to="/post/list" replace />;
  }

  return <Outlet />;
};