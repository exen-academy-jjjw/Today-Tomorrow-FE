import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postCreate } from "../../modules/redux/postSlice.js";
import Header from "../header/Header.js";

import "./css/createPageStyle.scss";

const PostCreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = ["travel", "hobby", "study", "etc"];
  const [selectedCategory, setSelectedCategory] = useState("");

  const [postInfo, setPostInfo] = useState({
    category: "",
    title: "",
    content: "",
    completion: 0,
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPostInfo((info) => ({ ...info, category: event.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const updatedPostInfo = {
      ...postInfo,
      completion: parseInt(postInfo.completion),
    };
    const response = await dispatch(postCreate(updatedPostInfo));
    console.log(response);
    if (response.meta.requestStatus === "fulfilled") {
      const newPostId = response.payload.data;
      navigate(`/post/detail/${newPostId}`);
    }
  };

  const onChangeHandler = (e) => {
    setPostInfo((info) => ({ ...info, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="pageBg">
        <Header />
        <div className="pageBox">
          <div>
            <form onSubmit={onSubmitHandler}>
              <div className="categoryBox">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="createTitleAndContent">
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  onChange={onChangeHandler}
                />
                <hr />
                <textarea
                  name="content"
                  placeholder="content"
                  onChange={onChangeHandler}
                ></textarea>
              </div>
              <div className="shareBox">
                <input className="shareBtn" type="checkbox" name="share" value = "1" onChange={onChangeHandler} />
                <span className="shareText">share</span>
              </div>
              <button className="createPostBtn" type="submit">add</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCreatePage;
