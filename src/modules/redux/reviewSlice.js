import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../axiosInstance.js";

// //초기값 설정
// const initialState = {
//   // postId: null,
//   // fileUrlList: [],
//   // reviewContent: "",
//   info:{},
//   isLoading: false,
//   details: null

//   // review: {
//   //   multipartFiles: [],
//   //   postId : null,
//   //   reviewContent : ""
//   // },
//   // isLoading: false,
//   // error: null
// };


// /* API 요청을 위한 액션 */
// // 작성
// export const createReview = createAsyncThunk(
//   "review/create/",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await instance.post(`/review/create/${payload.postId}`, payload
//       // , {
//         // headers: {
//         //   "Content-Type": "multipart/form-data" 
//         // },
//       // }
//       );
//       console.log("데이터3: ", data);

//       return thunkAPI.fulfillWithValue(data);
//     } catch(e){
//       // return thunkAPI.rejectWithValue(e);
//     }
//   }
// );
// export const createReview = createAsyncThunk(
//   "review/create",
//   async (payload, thunkAPI) => {
//     try {
//       const { postId, formData } = payload;
//       const response = await instance.post(`/review/create/${postId}`, formData);
//       console.log("데이터3: ", formData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );
// export const createReview = createAsyncThunk(
//   "review/create/",
//   async (payload, thunkAPI) => {
//     try {
//       console.log("postId : ", payload)
//       const response = await axios.post(`http://localhost:8080/review/create/${payload.postId}`, formData
//       // , {
//       //   headers: {
//       // //     "Content-Type": "application/json"
//       //     // "Content-Type": "multipart/form-data" 
//       //   },
//       // }
//       );
//       console.log("response: ", payload.review);
//       return thunkAPI.fulfillWithValue(payload.review);
//     } catch(e){
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );



import axios from "../axiosInstance.js";

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


/* API 요청을 위한 액션 */
// 작성
export const createReview = createAsyncThunk(
  "review/create/",
  async (payload, thunkAPI) => {
    try {
      console.log("postId : ", payload)
      const response = await instance.post(`http://localhost:8080/review/create/${payload.postId}`, payload.total, {
        headers: {
          "Content-Type": "multipart/form-data" 
        },
      });

      console.log(" payload.total : ",  payload.total)
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
      const response = await axios.get(`http://localhost:8080/review/detail/${postId}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);


// 수정
// export const updateFile = createAsyncThunk(
//   "file/update",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await instance.put(`/file/update/${payload.reviewId}`, payload.data);
//       const filedata = response.data.fileUrl;
//       return thunkAPI.fulfillWithValue(filedata);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );
// export const updateReview = createAsyncThunk(
//   "review/update/",
//   async (payload, thunkAPI) => {
//     try{
//       const response  = await instance.put(`/review/update/${payload.postId}`, payload.data);
//       const data = response.data.reviewContent;
//       return thunkAPI.fulfillWithValue(data);
//     } catch(e){
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );
export const updateReview = createAsyncThunk(
  "review/update",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(`/review/update/${payload.postId}`, payload.total, {
        headers: {
          "Content-Type": "multipart/form-data" 
        },
      });
      console.log("데이터: ", payload)
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
      await axios.delete(`/review/delete/${postId}`);
      return thunkAPI.fulfillWithValue(postId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 리뷰 슬라이스 생성
export const reviewSlice = createSlice({
  name : "review",
  initialState: {},
  reducers:{
    // setImageUrls: (state, action) => {
    //   return action.payload;
    // },
  },
  extraReducers:(builder) => {
    // builder
    //   .addCase(createReview.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(createReview.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.review = action.payload;
    //   })
    //   .addCase(createReview.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   })
    builder  
      .addCase(detailReview.pending, (state) => {
        state.isLoading = true;
        // state.review = action.payload;
      })
      .addCase(detailReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload;
      })
      .addCase(detailReview.rejected, (state) => {
        state.isLoading = false;
        // state.error = action.payload;
      })
    // builder
    //   .addCase(updateReview.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(updateReview.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.review = action.payload;
    //   })
    //   .addCase(updateReview.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   })
    // builder
    //   .addCase(deleteReview.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteReview.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.review = null;
    //   })
    //   .addCase(deleteReview.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   }) 
  }
}); 

export const { setReview } = reviewSlice.actions;
export default reviewSlice.reducer;
