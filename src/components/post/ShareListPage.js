import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCompletion } from "../../modules/redux/postSlice.js";
import Header from "../header/Header.js";
import "./css/listPageStyle.scss";

import instance from "../../modules/axiosInstance.js"

import {
  MdFlightTakeoff,
  MdFavorite,
  MdMoreHoriz,
  MdOutlineLibraryAdd,
  MdOutlineModeEdit,
  MdGroupAdd
} from "react-icons/md";

const CategoryListPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();

  const [hasNextpage, setHasNextPage] = useState(true);
  const observerTargetEl = useRef(null);
  const page = useRef(0);
  const { pathname } = useLocation();

  const fetchData = useCallback(async () => {
    try {
    //   const category = params.category;
      const nextPage = page.current + 1;

      const { data } = await instance.get(
        `http://localhost:8080/post/share?page=${page.current}&size=10`
      );

      if (data && Array.isArray(data)) {
        const postData = data.map((item) => ({
          ...item,
          completed: item.completion === 1,
        }));

        setData((prevData) => {
          const filteredData = prevData.filter((item) => !data.find((postItem) => postItem.postId === item.postId));
          return [...filteredData, ...postData];
        });
      }

      setHasNextPage(data.length === 10);
      page.current = nextPage;
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(true);
    }

  }, [location]);

  useEffect(() => {
    if (!observerTargetEl.current || !hasNextpage) return;
  
    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });

    io.observe(observerTargetEl.current);
  
    return () => {
      io.disconnect();
    };
  }, [fetchData, hasNextpage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleTitleClick = (postId) => {
    navigate(`/post/detail/${postId}`);
  };

  const handleCategoryClick = (category) => {
    page.current = 0;
    setData([]);
    navigate(`/post/list/${category}?page=${page.current}&size=10`);
  };

  const handleAllPostsClick = () => {
    page.current = 0;
    setData([]);
    navigate(`/post/list?page=${page.current}&size=10`);
  };

  const handleSharePostsClick = () => {
      page.current = 0;
      setData([]);
      navigate(`/post/share?page=${page.current}&size=10`);
  };

  const postCreateHandler = () => {
    navigate("/post/create");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="pageBg">
        <Header />
        <div className="categoryBox">
          <button
            onClick={() => handleCategoryClick("travel")}
            className="categoryButton"
          >
            <MdFlightTakeoff id="icon" />
            <span>travel</span>
          </button>
          <button
            onClick={() => handleCategoryClick("hobby")}
            className="categoryButton"
          >
            <MdFavorite id="icon" />
            <span>hobby</span>
          </button>
          <button
            onClick={() => handleCategoryClick("study")}
            className="categoryButton"
          >
            <MdOutlineModeEdit id="icon" />
            <span>study</span>
          </button>
          <button
            onClick={() => handleCategoryClick("etc")}
            className="categoryButton"
          >
            <MdMoreHoriz id="icon" />
            <span>etc</span>
          </button>
          <button onClick={handleAllPostsClick} className="categoryButton">
            <MdOutlineLibraryAdd id="icon" />
            <span>All</span>
          </button>
          <button onClick={() => handleSharePostsClick()} className="categoryButton">
              <MdGroupAdd id="icon" />
              <span>Share</span>
            </button>
        </div>
        <div>
          <ul style={{ listStyleType: "none" }}>
            {data &&
              data.map((item, index) => (
                <li className="postList" key={item.postId}>
                  <span className="postCount">{data.length - index}.</span>
                  <span onClick={() => handleTitleClick(item.postId)}>
                    {item.title}
                  </span>
                </li>
              ))}
          </ul>
          <div ref={observerTargetEl}></div>
        </div>
        <div className="addBtn">
          <button onClick={postCreateHandler}>add</button>
        </div>
      </div>
    </>
  );
};

export default CategoryListPage;