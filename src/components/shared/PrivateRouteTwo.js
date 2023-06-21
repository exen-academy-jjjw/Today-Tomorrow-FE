import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "../cookie/cookie";

export const PrivateRouteTwo = () => {
  const access = getCookie('refreshtoken');

  const restrictedPaths = ['/', '/member/signup', '/member/login'];
  const path = window.location.pathname;

  if (access && restrictedPaths.includes(path)) {
    return <Navigate to="/post/list" replace />;
  }

  return <Outlet />;
};