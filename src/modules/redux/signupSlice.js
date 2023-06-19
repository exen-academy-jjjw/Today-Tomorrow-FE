import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    memeberId: "",
    nickname: "",
    password: "",
    passwordConfirm: "" 
  };
  
  export const postSignup = createAsyncThunk(
    "mypage/getNickname",
    async (payload, thunkAPI) => {
      try{
        const data = await axios.post('http://localhost:8080/member/signup', payload.signupInfo);
        if(data.data === 400){
          window.alert("중복된 아이디입니다.");
          payload.navigate('/member/signup');
          return;
        }
        window.alert("회원가입 성공");
        payload.navigate('/member/login');
        return thunkAPI.fulfillWithValue(data);
      } catch(e){
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

  export const signupSlice = createSlice({
    name : "signupInfo",
    initialState,
    reducers:{},
    extraReducers:{
      
    }
  }); 

export const { setSignupInfo } = signupSlice.actions;
export default signupSlice.reducer;