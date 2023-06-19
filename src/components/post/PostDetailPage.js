import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPostDetails, updateCompletion, deletePost } from "../../modules/redux/postSlice.js";
import { useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Header from '../header/Header.js';

import "./css/postPageStyle.scss";

const PostDetailPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(fetchPostDetails(postId));
      if (response.payload) {
        const completionValue = response.payload.completion === 1 ? "1" : "0";
        setData({ ...response.payload, completion: completionValue });
      }
    }

    fetchData();
  }, [dispatch, postId]);

  const handleUpdateClick = () => {
    navigate(`/post/update/${data.postId}`, {
      state: {
        category: data.category,
        title: data.title,
        content: data.content,
        completion: data.completion,
      },
    });
  };

  const postDeleteHandler = async () => {
    await dispatch(deletePost(data.postId));
    navigate("/post/list");
  };

  const handleCheckboxClick = async () => {
    try {
      const completionValue = data.completion === "1" ? "0" : "1";
      await dispatch(updateCompletion({ postId: data.postId, completion: parseInt(completionValue) }));
      setData((prevData) => {
        return { ...prevData, completion: completionValue };
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="pageBg">
        <Header />
        <div className="pageBox">
          <div className="pageTop">
            {data.completion === "0" ? (
              <MdCheckBoxOutlineBlank id="icon" size={24} onClick={handleCheckboxClick} />
            ) : (
              <MdCheckBox id="icon" size={24} onClick={handleCheckboxClick} />
            )}
            <div className="updateAndDeleteBtn">
              <button onClick={handleUpdateClick}>update</button>
              <button onClick={postDeleteHandler}>delete</button>
            </div>
          </div>
          <div className="titleAndContent">
            <h3>{data.title}</h3>
            <p>{data.content}</p>
          </div>
          <button className="reviewCreateBtn" onClick={() => navigate(`/review/create/${data.postId}`)}>Review Create</button>
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;