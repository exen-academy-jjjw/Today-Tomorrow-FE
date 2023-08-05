import React, { useEffect, useState } from "react";
import "./css/commentpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createReply, detailComment, updateComment, deleteComment } from "../../modules/redux/commentSlice";

import CommentUpdate from "./CommentUpdate";
import { BiConversation, BiCommentDots, BiEditAlt, BiTrash } from "react-icons/bi";
import { getCookie } from "../cookie/cookie";

function CommentDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId, commentId } = useParams();
  const nickname = getCookie("nickname");


  const [data, setData] = useState([]);
  const [parentId, setParentId] = useState([]);

  // 댓글 조회
  useEffect(() => {
    async function detailData() {
      const response = await dispatch(detailComment(postId));;
      setData(response.payload);
      setParentId(response.payload.data);
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

  // 댓글 수정
  const [isEditing, setIsEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleUpdateClick = async (commentId, commentTxt) => {
    try {
      await dispatch(updateComment({ commentId, commentTxt }));
      setIsEditing(null);
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEditClick = (commentId, commentTxt) => {
      setIsEditing(commentId);
      setEditingText(commentTxt);
  };

  return (
    <>
      {data.data && data.data.map((comment) => (
        <div key={comment.id} className="commentP">
          <div className="comment">
            {isEditing === comment.id ? (
              <>
                <h5><strong>
                  <BiCommentDots /> {comment.nickname}
                </strong>{" "}:</h5>
                <CommentUpdate
                  comment={comment}
                  onEditClick={setIsEditing}
                  onUpdateClick={handleUpdateClick}
                />
              </>
            ) : (
              <>
                <h5><strong>
                  <BiCommentDots /> {comment.nickname}
                </strong>{" "}: {comment.commentTxt}</h5>
                {comment && comment.nickname === nickname && (
                  <div className="commentBtnBox">
                    <button className="commentBtn"
                      onClick={() => handleEditClick(comment.id, comment.commentTxt)}>
                      <BiEditAlt />
                    </button>
                    <button className="commentBtn"
                      onClick={(e) => deleteHandler(e, comment.id)}>
                      <BiTrash />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          {comment.children && comment.children.map((child) => (
            <div key={child.id} className="commentC">
              {isEditing === child.id ? (
                <>
                  <h5><strong>
                    <BiConversation /> {child.nickname}
                  </strong>{" "}:</h5>
                  <CommentUpdate
                    comment={child}
                    onEditClick={() => setIsEditing(null)}
                    onUpdateClick={handleUpdateClick}
                  />
                </>
              ):(
                <>
                  <h5><strong>
                    <BiConversation /> {child.nickname}
                  </strong>{" "}: {child.commentTxt}</h5>
                  {child && child.nickname === nickname && (
                    <div className="commentBtnBox">
                      <button className="commentBtn"
                        onClick={() => handleEditClick(child.id, child.commentTxt)}>
                        <BiEditAlt />
                      </button>
                      <button className="commentBtn"
                        onClick={(e) => deleteHandler(e, child.id)}>
                        <BiTrash />
                      </button>
                    </div>
                  )}
                </>
              )}
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