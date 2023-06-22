import React, { useEffect, useState } from "react";
import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header.js";
import { updateReview, detailReview } from "../../modules/redux/reviewSlice";
import ReviewpageFooter from "./ReviewpageFooter";

function ReviewUpdate(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  // 이미지
  const [image, setImage] = useState([]);
  const [fileImage, setFileImage] = useState([]);
  const [oriImage, setOriImage] = useState([]);


  // 리뷰
  const [data, setData] = useState("");

  //이미지 미리보기 및 등록
  const onChangeImg = async(e) => {
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

  useEffect(() => {
    async function detailData() {
        const response = await dispatch(detailReview(postId));
        setData(response.payload.reviewContent);
        setImage(response.payload.fileUrlList);
      }
    detailData();
  }, [dispatch, postId]);

  // 추가
  const checkImageInDB = async () => {
    try {
      // 이미지 DB 확인을 위한 API 요청
      // const response = await dispatch(detailReview(postId));



      // useEffect(() => {
      //   async function detailData() {
      //       const response = await dispatch(detailReview(postId));
      //       setData(response.payload.reviewContent);
      //       setOriImage(response.payload.fileUrlList);
      //     }
      //   detailData();
      // }, [dispatch, postId]);
    
      // const data = await response.json();
      // const { exists } = response.payload;


      // 이미지 DB에 있는지 여부를 판단하여 처리
      if (oriImage) {
        // 이미지가 DB에 있는 경우, 수정 요청
        setOriImage((prevFormData) => {
          const newFormData = new FormData(prevFormData);
          newFormData.delete("fileUrl"); // 기존 fileUrl 삭제
          for (let i = 0; i < image.length; i++) {
            newFormData.append("fileUrl", image[i]);
          }
          newFormData.set("postId", postId);
          return newFormData;
        });
      } else {
        // 이미지가 DB에 없는 경우, 추가 요청
        setOriImage((prevFormData) => {
          const newFormData = new FormData(prevFormData);
          newFormData.delete("fileUrl"); // 기존 fileUrl 삭제
          newFormData.append("fileUrl", image[0]); // 첫 번째 이미지만 추가
          newFormData.append("reviewContent", data);
          return newFormData;
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


  //이미지 삭제
  const handleDeleteImage = (id) => {
    setFileImage(fileImage.filter((_, index) => index !== id));
    setImage(image.filter((_, index) => index !== id));
  };

  // 리뷰 수정
  const handleContentChange = (e) => {
    setData(e.target.value);
  };


  // 이미지 및 리뷰 수정
  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("fileUrl", image[i]);
      console.log("수정 Url:", image[i] );
    }
    formData.append("reviewContent", data);
    console.log("데이터:", data );


    try {
      await dispatch(updateReview({ postId, total: formData }));
      // navigate(`/review/detail/${postId}`);
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
             

                {image.map((img, index) => (
                  <div className="imgBg" key={index}>
                    <div className="imgBox">
                      <img src={img} alt={`Image ${index}`} style={{ height: "13vh", minWidth: "10vw" }} />
                      <button type="button" className="imgBtn" onClick={() => handleDeleteImage(index)}>X</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reviewCreateBox" >
                <textarea className="review" placeholder="리뷰 작성" name="reviewContent" value={data} onChange={handleContentChange}/>
              </div>  
              <div className="reviewAddBtnBox">
                <button className="reviewAddBtn">Review update</button>
              </div>
            </div>
          </form>
        </div>
        <ReviewpageFooter />
      </div>
    </>
  )
}

export default ReviewUpdate;