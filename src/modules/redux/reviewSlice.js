import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../axiosInstance.js";


//초기값 설정
const initialState = {
  review: {
    fileUrlList: [],
    postId : null,
    reviewContent : ""
  },
  isLoading: false,
  error: null
};

// 작성
export const createReview = createAsyncThunk(
  "review/create/",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/review/create/${payload.postId}`, payload.total, {
        headers: {
          "Content-Type": "multipart/form-data" 
        },
      });
      return thunkAPI.fulfillWithValue(response);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 조회
export const detailReview = createAsyncThunk(
  "review/detail",
  async (postId, thunkAPI) => {
    try {
      const response = await instance.get(`/review/detail/${postId}`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);


// 수정
export const updateReview = createAsyncThunk(
  "review/update",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put(`/review/update/${payload.postId}`, payload.total, {
        headers: {
          "Content-Type": "multipart/form-data" 
        },
      });

      console.log("수정 : ", response);
      console.log("수정 total: ", payload.total);
      console.log("수정 payload: ", payload);
      
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);


// 삭제
export const deleteReview = createAsyncThunk(
  "review/delete",
  async (postId, thunkAPI) => {
    try {
      const res = await instance.delete(`/review/delete/${postId}`);

      if(res.data === 200) {
        return thunkAPI.fulfillWithValue(res.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 리뷰 슬라이스 생성
export const reviewSlice = createSlice({
  name : "review",
  initialState: {},
  reducers:{},
  extraReducers:(builder) => {
    builder  
      .addCase(detailReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(detailReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload;
      })
      .addCase(detailReview.rejected, (state) => {
        state.isLoading = false;
      });

      builder  
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteReview.rejected, (state) => {
        state.isLoading = false;
      });
  }
}); 

export const { setReview } = reviewSlice.actions;
export default reviewSlice.reducer;
