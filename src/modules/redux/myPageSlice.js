import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance.js";
import { removeCookie, setCookie } from "../../components/cookie/cookie.js";

const initialState = {
  info:{},
  isLoading: false,
  error: null,
};

  export const getMypageInfo = createAsyncThunk(
    "/mypage",
    async (payload, thunkAPI) => {
        try {
            const response = await instance.get('http://localhost:8080/member/mypage');

            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
  );

  export const updateNickname = createAsyncThunk(
    "member/update/nickname",
    async (nickname, thunkAPI) => {
        try {
            const response = await instance.put('http://localhost:8080/member/update/nickname', {nickname});

            if(response.data !== 400) {
                //response에 닉네임을 실어주는게 좋다.
                removeCookie('nickname');
                const newNickname = nickname;
                setCookie("nickname", newNickname);
            }

            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
  );

  export const updatePassword = createAsyncThunk(
    "member/update/password",
    async (payload, thunkAPI) => {
        console.log(payload);
        try {
            const response = await instance.put('http://localhost:8080/member/update/password', payload);

            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
  );

  export const memberDelete = createAsyncThunk(
    "member/delete",
    async (payload, thunkAPI) => {
        try {
            const response = await instance.post('http://localhost:8080/member/delete', payload.data);
            if(response.data === 200) {
                window.alert("회원탈퇴가 완료됐습니다");
                removeCookie("nickname");
                removeCookie("refreshtoken");
                localStorage.removeItem("accesstoken");
                payload.navigate("/");
            } else if(response.data === 400){
                window.alert("비밀번호가 틀렸습니다");
                payload.navigate("/mypage/unregister");
            }

            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
  );

  const myPageSlice = createSlice({
    name: "myPageInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMypageInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMypageInfo.fulfilled, (state,action) => {
                state.isLoading = false;
                state.info = action.payload;
            })
            .addCase(getMypageInfo.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })  
        }
  });

export const { setMyPageInfo } = myPageSlice.actions;
export default myPageSlice.reducer;