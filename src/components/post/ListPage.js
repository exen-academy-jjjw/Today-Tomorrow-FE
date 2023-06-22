import React, { useEffect, useCallback, useRef } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCompletion } from "../../modules/redux/postSlice.js";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Header from '../header/Header.js';
import "./css/listPageStyle.scss";
import axios from "../../modules/axiosInstance.js"

import { MdFlightTakeoff, MdFavorite, MdMoreHoriz, MdOutlineLibraryAdd, MdOutlineModeEdit } from "react-icons/md";

const ListPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [hasNextpage, setHasNextPage] = useState(true);
  const observerTargetEl = useRef(null);
  const page = useRef(0);
  const { pathname } = useLocation();

  const fetch = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/post/list?page=${page.current}&size=10`
      );
      const postData = data.map((item) => ({
        ...item,
        completed: item.completion === 1,
      }));
      
      setData((prevData) => [...prevData, ...postData]);
      setHasNextPage(data.length === 10);
      if (data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!observerTargetEl.current || !hasNextpage) return;
  
    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        fetch();
      }
    });
    io.observe(observerTargetEl.current);
  
    return () => {
      io.disconnect();
    };
  }, [fetch, hasNextpage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleTitleClick = (postId) => {
    navigate(`/post/detail/${postId}`);
  };

  const postCreateHandler = () => {
    navigate(`/post/create`);
  };

  const handleCategoryClick = (category) => {
    page.current = 0;
    setData([]);
    navigate(`/post/list/${category}?page=${page.current}&size=7`);
  };

  const handleAllPostsClick = () => {
    page.current = 0;
    setData([]);
    navigate(`/post/list?page=${page.current}&size=7`);
  };

  const handleCheckboxClick = async (postId) => {
    try {
      const completionValue = data.find((item) => item.postId === postId)?.completed ? 0 : 1;
      const res = await dispatch(updateCompletion({ postId, completion: completionValue }));
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

  return (
    <>
      <div className="pageBg">
        <Header />
        <div className="categoryBox">
            <button onClick={() => handleCategoryClick("travel")} className="categoryButton">
              <MdFlightTakeoff id="icon"/>
              <span>travel</span>
            </button>
            <button onClick={() => handleCategoryClick("hobby")} className="categoryButton">
              <MdFavorite id="icon"/>
              <span>hobby</span>
            </button>
            <button onClick={() => handleCategoryClick("study")} className="categoryButton">
              <MdOutlineModeEdit id="icon"/>
              <span>study</span>
            </button>
            <button onClick={() => handleCategoryClick("etc")} className="categoryButton">
              <MdMoreHoriz id="icon" />
              <span>etc</span>
            </button>
            <button onClick={() => handleAllPostsClick()} className="categoryButton">
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
                    <MdCheckBox size={24} onClick={() => handleCheckboxClick(item.postId)} />
                  ) : (
                    <MdCheckBoxOutlineBlank size={24} onClick={() => handleCheckboxClick(item.postId)} />
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
          <button onClick={postCreateHandler}>
            <span>add</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ListPage;