import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axiosInstance.js";

const initialState = {
    category: "",
    title: "",
    content: "",
    completion: "",
    isLoading: false,
    details: null,
  };

  export const postCreate = createAsyncThunk(
    "post/create",
    async (payload, thunkAPI) => {
      try{
        const data = await axios.post('http://localhost:8080/post/create', payload);

        return thunkAPI.fulfillWithValue(data);
      } catch(error) {}
    }
  );

  export const fetchPostDetails = createAsyncThunk(
    "post/details",
    async (postId, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:8080/post/detail/${postId}`);

        const postData = response.data;
        const completion = postData.completion || 0;
        // const dataWithParsedCompletion = { ...postData, completion: Number(completion) };
        const dataWithParsedCompletion = { ...postData, completion: completion };
        
        return thunkAPI.fulfillWithValue(dataWithParsedCompletion);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const deletePost = createAsyncThunk(
    "post/delete",
    async (postId, thunkAPI) => {
      try{
        const data = await axios.delete(`http://localhost:8080/post/delete/${postId}`);

        return thunkAPI.fulfillWithValue(data);
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

  export const updatePost = createAsyncThunk(
    "post/update",
    async (payload, thunkAPI) => {
      try{
        const data = await axios.put(`http://localhost:8080/post/update/${payload.postId}`,
          {
            category: payload.category,
            title: payload.title,
            content: payload.content,
            completion: payload.completion
          }
        );

        return thunkAPI.fulfillWithValue(data);
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

  export const updateCompletion = createAsyncThunk(
    "post/updateCompletion",
    async ({ postId, completion }, thunkAPI) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/post/completion/${postId}`,
          { completion }
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  const postSlice = createSlice({
    name: "postInfo",
    initialState: {
      title: "",
      isLoading: false,
      details: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPostDetails.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchPostDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.details = action.payload;
        })
        .addCase(fetchPostDetails.rejected, (state) => {
          state.isLoading = false;
        });
    },
  });

export const { setPostInfo } = postSlice.actions;
export default postSlice.reducer;