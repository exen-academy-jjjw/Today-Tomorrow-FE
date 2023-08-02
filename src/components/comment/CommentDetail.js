import React, { useEffect, useState } from "react";
import "./css/commentpageStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createReply, detailComment, updateComment, deleteComment } from "../../modules/redux/commentSlice";

import CommentUpdate from "./CommentUpdate";


function CommentDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId, commentId } = useParams();

  const [data, setData] = useState([]);
  const [parentId, setParentId] = useState([]);
  const [isEditing, setIsEditing] = useState(null);


  // 댓글 조회
  useEffect(() => {
    async function detailData() {
      const response = await dispatch(detailComment(postId));;
      setData(response.payload);
      setParentId(response.payload.data);
      console.log("데이터:", response.payload.data)
    }
    detailData();
  }, [dispatch, postId]);

  // 댓글 삭제 처리
  const deleteHandler = async (e, commentId) => {
    e.preventDefault();
    try {
      await dispatch(deleteComment(commentId));
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // 대댓글 작성 처리
  const [replyTxt, setReplyTxt] = useState("");

  const handleReplyTxt = (e, parentId) => {
    setReplyTxt(e.target.value);
    setParentId(parentId);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createReply({ commentId: parentId, commentTxt: replyTxt }));
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // 수정 버튼 클릭 시, 수정 폼 렌더링
  const handleUpdateClick = (commentId) => {
    setIsEditing(commentId);
  };
  

  return (
    <>
      {data.data && 
      data.data.map((comment) => (
        <div key={comment.id} className="commentP">
          <h5><strong>💬{comment.nickname}</strong> : {comment.commentTxt}</h5>
          <div className="commentBtnBox">
            <button className="commentBtn" onClick={() => navigate(`/comment/update/${comment.id}`)}>Update</button>
            <button className="commentBtn"  onClick={(e) => deleteHandler(e, comment.id)}>Delete</button>
          </div>
            {comment.children &&
              comment.children.map((child) => (
                <div key={child.id} className="commentC">
                  <h5><strong>💬{child.nickname}</strong> : {child.commentTxt}</h5>
                  <div className="commentBtnBox">
                    <button className="commentBtn" onClick={() => navigate(`/comment/update/${comment.id}`)}>Update</button>
                    <button className="commentBtn" onClick={(e) => deleteHandler(e, child.id)}>Delete</button>
                  </div>
                </div>
              ))}
            <div>
              <form onSubmit={onSubmitHandler}>
                <div className="commentBox">
                  <input className="commentTxt" placeholder="대댓글 작성" name="commentTxt" value={replyTxt} onChange={(e) => handleReplyTxt(e, comment.id)}/>
                </div>  
                <div className="commentAddBtnBox">
                    <button className="commentAddBtn">Add</button>
                </div>
              </form>
            </div>
          </div>
        ))}
    </>
  );
}

export default CommentDetail;