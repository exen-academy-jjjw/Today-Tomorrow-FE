import React, { useState } from "react";
import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header.js";
import { createReview } from "../../modules/redux/reviewSlice";
import ReviewpageFooter from "./ReviewpageFooter";


function Review(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  // 이미지
  const [image, setImage] = useState([]);
  const [fileImage, setFileImage] = useState([]);

  // 리뷰
  const [data, setData] = useState("");

  //이미지 미리보기 및 등록
  const onChangeImg = (e) => {
    const imageList = e.target.files;
    let imageLists = [...image];
    let imgFiles = [...fileImage];
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(e.target.files[i]);
      imgFiles.push(nowImageUrl);
      const nowImageUrl1 = e.target.files[i];
      imageLists.push(nowImageUrl1);
    }
    //이미지 개수 최대 3개까지 등록가능
    if (imageLists.length > 3) {
      window.alert("이미지는 최대 3개까지 등록 가능합니다")
      imageLists = imageLists.slice(0, 3);
    }
    if(imgFiles.length > 3){
      imgFiles = imgFiles.slice(0, 3);
    }
    setFileImage(imgFiles);
    setImage(imageLists);
  };

  //이미지 삭제
  const handleDeleteImage = (id) => {
    setFileImage(fileImage.filter((_, index) => index !== id));
    setImage(image.filter((_, index) => index !== id));
  };

  // 리뷰 등록
  const handleContent = (e) => {
    setData(e.target.value);
  };

  // 이미지 및 리뷰 등록 보내기
  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("fileUrl", image[i]);
    }
    formData.append("reviewContent", data);

    try {
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
                <input type="file" className="file" id="fileTxt" name="fileUrl" multiple onChange={onChangeImg}/>
                <br />
                {image.map((img, index) => (
                  <div className="imgBg" key={index}>
                    <div className="imgBox">
                      <img src={URL.createObjectURL(img)} alt={`Image ${index}`} style={{ height: "13vh", minWidth: "10vw" }} />
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
        <ReviewpageFooter />
      </div>
    </>
  )
}

export default Review;
