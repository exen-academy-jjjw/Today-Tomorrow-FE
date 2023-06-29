import React, { useState } from "react";
import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header.js";
import { createReview } from "../../modules/redux/reviewSlice";
import Dropzone from "react-dropzone";


function Review(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  // 이미지
  const [images, setImages] = useState([]);

  // 리뷰
  const [data, setData] = useState("");

  const handleDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    //이미지 개수 최대 3개까지 등록가능
    if (images.length + newImages.length <= 3) {
      setImages((prevImages) => [...prevImages, ...newImages]);
    } else {
      window.alert("이미지는 최대 3개까지 등록 가능합니다.");
    }
  };

  //이미지 삭제
  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // 리뷰 등록
  const handleContent = (e) => {
    setData(e.target.value);
  };

  // 이미지 및 리뷰 등록 보내기
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("fileUrl", images[i].file);
    }
    formData.append("reviewContent", data);

    try {
      console.log("새글 폼데이터: ", formData);
      await dispatch(createReview({ postId, total: formData }));
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

export default Review;
