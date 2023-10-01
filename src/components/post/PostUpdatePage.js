import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPostDetails } from "../../modules/redux/postSlice.js";
import { updatePost } from "../../modules/redux/postSlice.js";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Header from "../header/Header.js";

import "./css/updatePageStyle.scss";

const PostUpdatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const categories = ["travel", "hobby", "study", "etc"];
  const [selectedCategory, setSelectedCategory] = useState("");

  const location = useLocation();
  const { category, title, content, completion, share } = location.state;

  const [postInfo, setPostInfo] = useState({
    postId: "",
    category: "",
    title: "",
    content: "",
    completion: "",
    share: ""
  });

  useEffect(() => {
    setPostInfo({
      postId: postId,
      category,
      title,
      content,
      completion,
      share
    });
    setSelectedCategory(category);
  }, [postId, category, title, content, completion, share]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPostInfo((info) => ({ ...info, category: event.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await dispatch(updatePost(postInfo));
    await dispatch(fetchPostDetails(postId));

    navigate(`/post/detail/${postId}`);
  };

  const handleCompletionClick = () => {
    const completionValue = postInfo.completion === "1" ? "0" : "1";
    setPostInfo((info) => ({ ...info, completion: completionValue }));
  };

  const handleShareClick = () => {
    const shareValue = postInfo.share === 1 ? 0 : 1;
    setPostInfo((info) => ({ ...info, share: shareValue }));
  };

  return (
    <>
      <div className="pageBg">
        <Header />
        <div className="pageBox">
          <div>
            <form onSubmit={onSubmitHandler}>
              <div className="pageTop" onClick={handleCompletionClick}>
                {postInfo.completion === "0" ? (
                  <MdCheckBoxOutlineBlank id="icon" size={24} />
                ) : (
                  <MdCheckBox id="icon" size={24} />
                )}
              </div>
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
              <div className="updateTitleAndContent">
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={postInfo.title}
                    onChange={(e) =>
                    setPostInfo({ ...postInfo, title: e.target.value })
                    }
                />
                <hr />
                <textarea
                    name="content"
                    placeholder="content"
                    value={postInfo.content}
                    onChange={(e) =>
                    setPostInfo({ ...postInfo, content: e.target.value })
                    }
                ></textarea>
              </div>
              <div className="shareBox">
                <input
                  className="shareBtn"
                  type="checkbox"
                  name="share"
                  checked={postInfo.share === 1}
                  onChange={handleShareClick}
                />
                <span className="shareText">share</span>
              </div>
              <button className="updatePostBtn" type="submit">update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostUpdatePage;