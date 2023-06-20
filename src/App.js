import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './components/main/Main';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import ListPage from './components/post/ListPage';
import PostDetailPage from './components/post/PostDetailPage';
import PostUpdatePage from './components/post/PostUpdatePage';
import PostCreatePage from './components/post/PostCreatePage';
import CategoryListPage from './components/post/CategoryListPage';
import Mypage from './components/mypage/Mypage';
import Unregister from './components/mypage/Unregister';

import Review from './components/review/Review';
import ReviewDetail from './components/review/ReviewDetail';
import ReviewUpdate from './components/review/ReviewUpdate';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/member/signup' element={<SignupPage />}/>
        <Route path='/member/login' element={<LoginPage />}/>
        <Route path='/mypage' element={<Mypage />}/>
        <Route path='/mypage/unregister' element={<Unregister />}/>
        <Route path='/post/list' element={<ListPage />} />
        <Route path='/post/detail/:postId' element={<PostDetailPage />} />
        <Route path='/post/update/:postId' element={<PostUpdatePage />} />
        <Route path='/post/create' element={<PostCreatePage />} />
        <Route path='/post/list/:category' element={<CategoryListPage />} />

        <Route path='/review/create/:postId' element={<Review />} />
        <Route path='/review/detail/:postId' element={<ReviewDetail />} />
        <Route path='/review/update/:postId' element={<ReviewUpdate />} />
      </Routes>
    </>
  );
}

export default App;
