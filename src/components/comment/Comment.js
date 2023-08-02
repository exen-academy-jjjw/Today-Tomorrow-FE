import React, { useState } from "react";
// import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header.js";
import { createComment } from "../../modules/redux/commentSlice";


function Comment(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { commentId } = useParams();

  // 댓글
  const [data, setData] = useState("");

  // 댓글 등록
  const handleContent = (e) => {
    setData(e.target.value);
  };

  // 댓글 등록 보내기
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        if(parentId == null){
            await dispatch(createComment({ postId, data }));
        } else{
            await dispatch(createReply({ commentId, data }));
        }
        navigate(`/post/detail/${postId}`);
    } catch (error) {
        console.log("Error:", error);
    }
  };
  
  return (
    <>
      <div className="pageBg" >
      <Header />
        <br/> 
        <div className="pageBox">
          <form onSubmit={onSubmitHandler}>
            <div className="reviewBox">
              <div className="fileBox">
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {images.length < 3 && <button type="button">Image</button>}
                    </div>
                    )}
                </Dropzone>
                <br />
                {images.map((img, index) => (
                  <div className="imgBg" key={index}>
                    <div className="imgBox">
                      <img src={img.preview} alt={`Image ${index}`} style={{ height: "13vh", minWidth: "10vw" }} />
                      <button type="button" className="imgBtn" onClick={() => handleDeleteImage(index)}>X</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reviewCreateBox" >
                <textarea className="review" placeholder="리뷰 작성" name="reviewContent" value={data} onChange={handleContent}/>
              </div>  
              <div className="reviewAddBtnBox">
                <button className="reviewAddBtn">Review Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Comment;