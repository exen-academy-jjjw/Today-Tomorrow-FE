import { configureStore } from "@reduxjs/toolkit";
import signupSliceReducer from "./redux/signupSlice";
import loginSliceReducer from "./redux/loginSlice";
import listSliceReducer from "./redux/listSlice";
import postSliceReducer from "./redux/postSlice";
import myPageSliceReducer from "./redux/myPageSlice";
import reviewSliceReducer from "./redux/reviewSlice";
import commentSliceReducer from "./redux/commentSlice";

const store = configureStore({
  reducer: {
    signupSlice: signupSliceReducer,
    loginSlice: loginSliceReducer,
    listSlice: listSliceReducer,
    postSlice: postSliceReducer,
    myPageSlice: myPageSliceReducer,
    reviewSlice: reviewSliceReducer,
    commentSlice: commentSliceReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
export default store;