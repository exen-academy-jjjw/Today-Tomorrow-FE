import React, { useState } from "react";
import "./css/commentpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createComment } from "../../modules/redux/commentSlice";


function Comment(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId, commentId } = useParams();

  // 댓글
  const [commentTxt, setCommentTxt] = useState("");

  // 댓글 등록
  const handleContent = (e) => {
    setCommentTxt(e.target.value);
  };

  // 댓글 등록 보내기
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        await dispatch(createComment({ postId, commentTxt }));
        window.location.reload();
    } catch (error) {
        console.log("Error:", error);
    }
  };
  
  return (
    <>
        <div className="commentP">
            <form onSubmit={onSubmitHandler}>
                <div className="commentBox">
                    <input className="commentTxt" placeholder="댓글 작성" name="commentTxt" value={commentTxt} onChange={handleContent}/>
                </div>  
                <div className="commentAddBtnBox">
                    <button className="commentAddBtn">Add</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default Comment;