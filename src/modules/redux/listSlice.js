import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axiosInstance.js";

const initialState = {
  data: [],
  isLoading: false,
  title: "",
};

export const fetchPostList = createAsyncThunk(
  "post/list", async (payload, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:8080/post/list");

    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchPostCategoryList = createAsyncThunk(
  "post/categoryList",
  async (category, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:8080/post/list/${category}`);

      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const listSlice = createSlice({
  name: "listInfo",
  initialState: {
    data: [],
    title: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.title = action.payload.data;
      })
      .addCase(fetchPostList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setListInfo } = listSlice.actions;
export default listSlice.reducer;