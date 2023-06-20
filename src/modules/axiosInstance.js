import axios from "axios";
import { getCookie, setCookie } from "../components/cookie/cookie";

// url 호출 시 기본 값 셋팅
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-type": "application/json" },
});

// 요청시
api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accesstoken");

    //요청시 AccessToken 계속 보내주기
    if (!accessToken) {
        config.headers.authorization = accessToken;
        console.log("request start", config);
        return config;
    }

    if (config.headers && accessToken) {
        config.headers.authorization = accessToken;
        console.log("request start", config);
      return config;
    }
  },
  function (error) {
    
    console.log("request error", error);
    return Promise.reject(error);
  }
);

// 데이터받을 시
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    console.log(error);
    if(error.response.status === 401) {
      const originalRequest = error;
      const headers = {
          Authorization: localStorage.getItem("accesstoken"),
          RefreshToken: getCookie("refreshtoken")
      };
      const data = await axios.post('http://localhost:8080/member/reissue', null, { headers });
      localStorage.setItem("accesstoken", data.headers.authorization);
      if(data.headers.refreshtoken) {
          setCookie("refreshtoken", data.headers.refreshtoken);
      }
      originalRequest.config.headers.authorization = localStorage.getItem("accesstoken");
      return await axios(originalRequest.config);
      }
    }
);

export default api;