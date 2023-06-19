import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  const expired = new Date();
  expired.setTime(expired.getTime() + (1000 * 60 * 60 * 24 * 7));
  return cookies.set(name, value, {path: "/",expires: expired});
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, option) => {
  return cookies.remove(name, {expires: 0});
};