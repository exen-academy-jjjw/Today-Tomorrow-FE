import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axiosInstance.js";
import { getCookie, removeCookie, setCookie } from "../../components/cookie/cookie";

const initialState = {
  info:{},
  isLoading: false,
  error: null,
};

export const postLogin = createAsyncThunk(
  "member/login",
  async (payload, thunkAPI) => {

    try{
      const data = await axios.post('http://localhost:8080/member/login', payload.loginInfo);

      if(data.headers.authorization !== null) {
        localStorage.setItem('accesstoken', data.headers.authorization);
        if(data.headers.refreshtoken) {
          setCookie("refreshtoken", data.headers.refreshtoken);
          window.alert("환영합니다!");
          payload.navigate('/post/list');
        } else {
          window.alert("아이디 혹은 비밀번호가 잘못되었습니다.");
        }
        console.log(data);
      } 
      return thunkAPI.fulfillWithValue(data);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logout =  createAsyncThunk(
  "member/logout",
  async (payload, thunkAPI) => {
    try{
      await axios.get('http://localhost:8080/member/logout');

      removeCookie("nickname");
      removeCookie("refreshtoken");
      localStorage.removeItem("accesstoken");

      return thunkAPI.fulfillWithValue(null);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const loginSlice = createSlice({
  name : "loginInfo",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nickname = action.payload.data;
        removeCookie('nickname');
        setCookie("nickname", state.nickname);
      })
      .addCase(postLogin.rejected, (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    });
  }
}); 

export const { setLoginInfo } = loginSlice.actions;
export default loginSlice.reducer;