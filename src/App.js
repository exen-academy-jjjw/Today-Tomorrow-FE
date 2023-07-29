import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";
import ExitBeforeMainin from "./components/main/ExitBeforeMain.js";
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import ListPage from "./components/post/ListPage";
import PostDetailPage from "./components/post/PostDetailPage";
import PostUpdatePage from "./components/post/PostUpdatePage";
import PostCreatePage from "./components/post/PostCreatePage";
import CategoryListPage from "./components/post/CategoryListPage";
import ShareListPage from "./components/post/ShareListPage";
import Mypage from "./components/mypage/Mypage";
import Unregister from "./components/mypage/Unregister";
import { PrivateRoute } from "./components/shared/PrivateRoute";
import { PrivateRouteTwo } from "./components/shared/PrivateRouteTwo";

import Review from "./components/review/Review";
import ReviewUpdate from "./components/review/ReviewUpdate";
import ReviewDetail from "./components/review/ReviewDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ExitBeforeMainin />} />

        <Route path="/member">
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRouteTwo />}>
          <Route path="/main" element={<Main />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/mypage">
            <Route path="" element={<Mypage />} />
            <Route path="unregister" element={<Unregister />} />
          </Route>

          <Route path="/post">
            <Route path="create" element={<PostCreatePage />} />
            <Route path="detail/:postId" element={<PostDetailPage />} />
            <Route path="update/:postId" element={<PostUpdatePage />} />
            <Route path="share" element={<ShareListPage />} />

            <Route path="list">
              <Route path="" element={<ListPage />} />
              <Route path=":category" element={<CategoryListPage />} />
            </Route>
          </Route>

          <Route path="/review">
            <Route path="create/:postId" element={<Review />} />
            <Route path="detail/:postId" element={<ReviewDetail />} />
            <Route path="update/:postId" element={<ReviewUpdate />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
