import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../axiosInstance.js";


//초기값 설정
const initialState = {
  comment: {
    postId : null,
    commentId : null,
    commentTxt : ""
  },
  isLoading: false,
  error: null
};

// 작성
export const createComment = createAsyncThunk(
  "comment/create",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/comment/create/${payload.postId}`, payload);
      return thunkAPI.fulfillWithValue(response);
    } catch(e){
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const createReply = createAsyncThunk(
    "comment/reply",
    async (payload, thunkAPI) => {
    try {
        const response = await instance.post(`/comment/reply/${payload.commentId}`, payload);
        return thunkAPI.fulfillWithValue(response);
        } catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
);

// 조회
export const detailComment = createAsyncThunk(
  "comment/detail",
  async (postId, thunkAPI) => {
    try {
      const response = await instance.get(`/comment/detail/${postId}`
      );
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 수정
export const updateComment = createAsyncThunk(
  "comment/update",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put(`/comment/update/${payload.commentId}`, payload);

      console.log("수정 : ", response);
      console.log("수정 payload: ", payload);
      
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 삭제
export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (commentId, thunkAPI) => {
    try {
      const res = await instance.delete(`/comment/delete/${commentId}`);

      if(res.data === 200) {
        return thunkAPI.fulfillWithValue(res.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 댓글 슬라이스 생성
export const commentSlice = createSlice({
  name : "comment",
  initialState: {},
  reducers:{},
  extraReducers:(builder) => {
    builder  
      .addCase(detailComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(detailComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload;
      })
      .addCase(detailComment.rejected, (state) => {
        state.isLoading = false;
      });

      builder  
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.isLoading = false;
      });
  }
}); 

export const { setComment } = commentSlice.actions;
export default commentSlice.reducer;
