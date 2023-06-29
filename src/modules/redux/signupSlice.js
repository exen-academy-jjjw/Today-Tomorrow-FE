import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "axios";

const initialState = {
  info:{},
  isLoading: false,
  error: null,
};

  
  export const postSignup = createAsyncThunk(
    "mypage/getNickname",
    async (payload, thunkAPI) => {
      try{
        const data = await instance.post('http://localhost:8080/member/signup', payload.signupInfo);
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
    extraReducers: (builder) => {
      builder
        .addCase(postSignup.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(postSignup.fulfilled, (state,action) => {
            state.isLoading = false;
            state.info = action.payload;
        })
        .addCase(postSignup.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        })  
    }   
  }); 


export const { setSignupInfo } = signupSlice.actions;
export default signupSlice.reducer;