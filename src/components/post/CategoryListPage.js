import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCompletion } from "../../modules/redux/postSlice.js";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Header from "../header/Header.js";
import "./css/listPageStyle.scss";

import axios from "../../modules/axiosInstance.js"

import {
  MdFlightTakeoff,
  MdFavorite,
  MdMoreHoriz,
  MdOutlineLibraryAdd,
  MdOutlineModeEdit,
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
      const category = params.category;
      const nextPage = page.current + 1;

      const { data } = await axios.get(
        `http://localhost:8080/post/list/${category}?page=${page.current}&size=10`
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

  }, [location, params.category]);

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

  const handleCheckboxClick = async (postId) => {
    try {
      const completionValue = data.find((item) => item.postId === postId)
        ?.completed
        ? 0
        : 1;
      const res = await dispatch(
        updateCompletion({ postId, completion: completionValue })
      );
      console.log(res);
      setData((prevData) => {
        return prevData.map((item) => {
          if (item.postId === postId) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
      });
    } catch (error) {
      console.error(error);
    }
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
        </div>
        <div>
          <ul style={{ listStyleType: "none" }}>
            {data &&
              data.map((item) => (
                <li className="postList" key={item.postId}>
                  {item.completed ? (
                    <MdCheckBox
                      size={24}
                      onClick={() => handleCheckboxClick(item.postId)}
                    />
                  ) : (
                    <MdCheckBoxOutlineBlank
                      size={24}
                      onClick={() => handleCheckboxClick(item.postId)}
                    />
                  )}
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