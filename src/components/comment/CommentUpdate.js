import React, { useState, useEffect } from "react";
import "./css/commentpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailComment, updateComment } from "../../modules/redux/commentSlice";

function CommentUpdate(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId, commentId } = useParams();

  // 댓글
  const [commentTxt, setCommentTxt] = useState("");

  // 댓글 조회
  useEffect(() => {
    async function detailData() {
      const response = await dispatch(detailComment(postId));;
      setCommentTxt(response.commentTxt);
      // console.log("데이터:",  response.payload)
      // const comment = response.payload((c) => c.id === parseInt(commentId));
      // if (comment) {
      //   setCommentTxt(comment.commentTxt);
      // }
    }
    detailData();
  }, [dispatch, postId, commentId]);

  // 댓글 등록
  const handleContent = (e) => {
    setCommentTxt(e.target.value);
  };

  // 댓글 등록 보내기
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateComment(commentId, { commentTxt }));
      navigate(`/post/detail/${postId}`);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  return (
    <>
      <form onSubmit={onSubmitHandler}>
          <div className="commentBox">
              <input className="commentTxt" placeholder="댓글 작성" name="commentTxt" value={commentTxt} onChange={handleContent}/>
          </div>  
          <div className="commentAddBtnBox">
              <button className="commentAddBtn">Update</button>
          </div>
      </form>
    </>
  )
}

export default CommentUpdate;