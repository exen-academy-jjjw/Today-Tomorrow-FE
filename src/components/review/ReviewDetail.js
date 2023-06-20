import React, { useEffect, useState } from "react";
import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";
import Header from "../header/Header.js";
import { detailReview, deleteReview, setImageUrls } from "../../modules/redux/reviewSlice";
import ReviewpageFooter from "./ReviewpageFooter";

import { convertLocalFilePathToURL } from "./utils"; // 이미지 URL 생성 함수



function ReviewDetail(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  // 리뷰
  const [data, setData] = useState("");
  // 이미지
  const [image, setImage] = useState([]);
  const [fileImage, setFileImage] = useState([]);
  // console.log("이미지:", image);
  const [imageUrls, setImageUrls] = useState([]);



  useEffect(() => {
    async function detailData() {
      try {
        const response = await dispatch(detailReview(postId));
        const { reviewContent: data, fileUrlList } = response.payload;
        // dispatch(setImageUrls(fileUrlList));


        // const urls = fileUrlList.map((localPath) => convertLocalFilePathToURL(localPath));
        // setImageUrls(urls);



        setData(data);
        setImage(fileUrlList);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    detailData();
  }, [dispatch, postId]);

  // 리뷰 삭제 처리
  const deleteHandler = async (e) => {
    e.preventDefault();
    dispatch(deleteReview(postId));
    navigate(`/home`);
  };



  // //이미지 미리보기 및 등록
  // const onChangeImg = (e) => {
  //   const imageList = e.target.files;
  //   let imageLists = [...image];
  //   let imgFiles = [...fileImage];
  //   for (let i = 0; i < imageList.length; i++) {
  //     const nowImageUrl = URL.createObjectURL(fileUrlList[i]);
  //     imgFiles.push(nowImageUrl);
  //     const nowImageUrl1 = fileUrlList[i];
  //     imageLists.push(nowImageUrl1);
  //   }
  //   //이미지 개수 최대 3개까지 등록가능
  //   if (imageLists.length > 3) {
  //     window.alert("이미지는 최대 3개까지 등록 가능합니다")
  //     imageLists = imageLists.slice(0, 3);
  //   }
  //   if(imgFiles.length > 3){
  //     imgFiles = imgFiles.slice(0, 3);
  //   }
  //   setFileImage(imgFiles);
  //   setImage(imageLists);
  // };

  // //이미지 삭제
  // const handleDeleteImage = (id) => {
  //   setFileImage(fileImage.filter((_, index) => index !== id));
  //   setImage(image.filter((_, index) => index !== id));
  // };







  // // 웹 URL 경로
  // function convertLocalFilePathToURL(localPath) {
  //   const pathSegments = localPath.replace(/\\/g, '/').split('/');
  //   const filePath = pathSegments.slice(1).join('/'); // Remove the drive letter from the path
  //   console.log("데이터: ", filePath)
  //   const UrlPath = `file:///${filePath}`;
  //   return UrlPath;
  // } 

  return (
    <>
      <div className="pageBg" >
      <Header />
        <br/> 
        <div className="pageBox">
          <div className="reviewAboutPostBox">
            <div className="fileBox">
              {/* <img src="C://upload//4/2658298d-8acb-443d-a1f4-a6e9eea58034_33－332256＿northern－lights－wallpaper－aurora.jpg"></img> */}
                <br />
                {/* {imageUrls.map((img, index) => (
                  <div className="imgBg" key={index}>
                    <div className="imgBox">
                      <img src={img} alt={`Image ${index}`} style={{ height: "15vh", minWidth: "10vw" }} />
                    </div>
                  </div>
                ))} */}
{/* 
                {image.map((fileUrlList, index) => (
                  <div className="imgBg" key={index}>
                    <div className="imgBox">
                      <img src={fileUrlList} alt={`Image ${index}`} style={{ height: "13vh", maxWidth: "10vw",minWidth: "10vw" }} />
                    </div>
                  </div> */}
                  {/* ))} */}
            </div>
          </div>
          <div className="reviewDetailBox">
            <textarea className="review" name="reviewContent" value={data} readOnly />  
          </div>  
          <div className="reviewAddBtnBox">
            <button className="reviewAddBtn" onClick={() => navigate(`/review/update/${postId}`)}>수정</button>
            <button className="reviewAddBtn" onClick={deleteHandler}>삭제</button>
          </div>
        </div>
        <ReviewpageFooter />
      </div>
    </>
  )
}

export default ReviewDetail;


