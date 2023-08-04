import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPostDetails, updateCompletion, deletePost } from "../../modules/redux/postSlice.js";
import { useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Header from '../header/Header.js';
import ReviewDetail from '../review/ReviewDetail';

import "./css/postPageStyle.scss";

import Comment from "../comment/Comment.js";
import CommentDetail from "../comment/CommentDetail.js";

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

        const shareValue = response.payload.share === 1 ? "1" : "0";
        setData({ ...response.payload, share: shareValue });
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
        share: data.share
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
      const response = await dispatch(updateCompletion({ postId: data.postId, completion: parseInt(completionValue) }));

      if(response.payload === 400) {
        window.alert("작성자만 완료 여부를 변경할 수 있습니다.");
        return;
      }

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
          {data.existReview === 1 ? <ReviewDetail />
          : <button className="reviewCreateBtn" onClick={() =>
            navigate(`/review/create/${data.postId}`)}>Review Create
            </button>
           }
          {data.existComment == 0 ? <Comment/> : <><CommentDetail /> <Comment/></>}
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;