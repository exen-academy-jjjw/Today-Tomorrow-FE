import React, { useState } from "react";
import "./css/commentpageStyle.scss";

import { BiSave, BiExit } from "react-icons/bi";

function CommentUpdate({ comment, onEditClick, onUpdateClick }){
  const [editingText, setEditingText] = useState(comment.commentTxt);

  const handleUpdateClick = (e) => {
    e.preventDefault();
    onUpdateClick(comment.id, editingText);
  };

  return (
    <>
      <form>
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUpdateClick(e);
            }
          }}
        />
      </form>
      <div className="commentBtnBox">
        <button className="commentBtn" onClick={handleUpdateClick}>
          <BiSave />
        </button>
        <button className="commentBtn" onClick={() => onEditClick(null)}>
          <BiExit />
        </button>
      </div>
    </>
  );
}

export default CommentUpdate;