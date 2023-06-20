import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchPostCategoryList,
  fetchPostList,
} from "../../modules/redux/listSlice.js";
import { updateCompletion } from "../../modules/redux/postSlice.js";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Header from "../header/Header.js";
import "./css/listPageStyle.scss";

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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const category = params.category;
        const response = await dispatch(fetchPostCategoryList(category));
        if (response.payload && Array.isArray(response.payload.data)) {
          const postData = response.payload.data.map((item) => ({
            ...item,
            completed: item.completion === 1,
          }));
          setData(postData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [location]);

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
    navigate(`/post/list/${category}`);
  };

  const handleAllPostsClick = () => {
    navigate("/post/list/");
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
        </div>
        <div className="addBtn">
          <button onClick={postCreateHandler}>add</button>
        </div>
      </div>
    </>
  );
};

export default CategoryListPage;
