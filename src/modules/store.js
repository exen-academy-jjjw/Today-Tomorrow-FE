// import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./redux/signupSlice";
// import loginSlice from "./redux/loginSlice";

import listSlice from "./redux/listSlice";
import postSlice from "./redux/postSlice";
import myPageSlice from "./redux/myPageSlice";

// const store = configureStore({
//   reducer: {
//     signupSlice,
//     loginSlice,
//     listSlice,
//     postSlice,
//     myPageSlice
//   },
//   middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
//   devTools: true,
// });

import { configureStore } from "@reduxjs/toolkit";
import signupSliceReducer from "./redux/signupSlice";
import loginSliceReducer from "./redux/loginSlice";
import listSliceReducer from "./redux/listSlice";
import postSliceReducer from "./redux/postSlice";
import myPageSliceReducer from "./redux/myPageSlice";
import reviewSliceReducer from "./redux/reviewSlice";

const store = configureStore({
  reducer: {
    signupSlice: signupSliceReducer,
    loginSlice: loginSliceReducer,
    listSlice: listSliceReducer,
    postSlice: postSliceReducer,
    myPageSlice: myPageSliceReducer,
    reviewSlice: reviewSliceReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
export default store;