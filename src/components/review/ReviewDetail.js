import React, { useEffect, useState } from "react";
import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";
import Header from "../header/Header.js";
import { detailReview, deleteReview, setImageUrls } from "../../modules/redux/reviewSlice";
import ReviewpageFooter from "./ReviewpageFooter";

// import { convertLocalFilePathToURL } from "./utils"; // 이미지 URL 생성 함수

// 웹 URL 경로
// function convertLocalFilePathToURL(localPath) {
//   const pathSegments = localPath.split("\\");
//   const fileUrlList = pathSegments[pathSegments.length - 1];
//   console.log("fileUrlList: ", fileUrlList)
//   return `${process.env.PUBLIC_URL}/uploads/${fileUrlList}`;
// }
// function convertLocalFilePathToURL(localPath) {
//   const pathSegments = localPath.split("\\");
//   const fileUrlList = pathSegments[pathSegments.length - 1];
//   console.log("fileUrlList: ", fileUrlList);
//   return `${process.env.PUBLIC_URL}/upload/${fileUrlList}`;
// }

 // 웹 URL 경로
  function convertLocalFilePathToURL(localPath) {
    const pathSegments = localPath.replace(/\\/g, '/').split('/');
    const filePath = pathSegments.slice(1).join('/'); // Remove the drive letter from the path
    console.log("데이터: ", filePath)
    // const UrlPath = `file:///${filePath}`;
    // return UrlPath;
    // const fileName
    // console.log("데이터: ", pathSegments)
    return filePath;

  } 

function ReviewDetail(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  // 리뷰
  const [data, setData] = useState("");
  // 이미지
  const [image, setImage] = useState([]);
  const [fileImage, setFileImage] = useState([]);
  console.log("이미지:", image);

  const [imageUrls, setImageUrls] = useState([]);

  // useEffect(() => {
  //   async function fetchReviewDetail() {
  //     try {
  //       const response = await dispatch(detailReview(postId));

  //       // if (!response.data) {
  //       //   console.log("API 응답이 올바르지 않습니다.");
  //       //   return;
  //       // }
  
  //       const { data: reviewData, fileUrlList: imagePaths } = response.data;
  //       console.log("reviewData: ", reviewData)
  //       console.log("imagePaths: ", imagePaths)

  
  //       // 데이터 추출
  //       const { reviewContent: data } = reviewData;
  
  //       // 파일 경로를 Blob 객체로 변환하는 함수
  //       const pathToBlob = async (path) => {
  //         const response = await fetch(path);
  //         const blob = await response.blob();
  //         return blob;
  //       };
  
  //       // 파일 경로들을 Blob 객체들로 변환하여 배열로 가져오기
  //       const imageBlobs = await Promise.all(imagePaths.map(pathToBlob));
  
  //       // Blob 객체들을 URL로 변환하여 이미지 URL 배열 생성
  //       const imageUrls = imageBlobs.map((blob) => URL.createObjectURL(blob));
  
  //       // 데이터와 이미지 URL 설정
  //       setData(data);
  //       setImageUrls(imageUrls);
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   }
  
  //   fetchReviewDetail();
  // }, [postId]);
  

  useEffect(() => {
    async function detailData() {
        const response = await dispatch(detailReview(postId));

        // const image = response.payload.fileUrlList.map((localPath) => convertLocalFilePathToURL(localPath));
        // const imageUrls = image.map((fileUrl) => URL.createObjectURL(fileUrl));
        // const fileU = response.payload.fileUrlList.map((img, index) => ());
        setData(response.payload.reviewContent);
        setImage(response.payload.fileUrlList);
        console.log("정보1: ", response.payload.reviewContent)
        console.log("정보2: ", response.payload.fileUrlList)
        // console.log("정보3: ", fileU[0])


      }
    detailData();
  }, [dispatch, postId]);

  // 리뷰 삭제 처리
  const deleteHandler = async (e) => {
    e.preventDefault();
    dispatch(deleteReview(postId));
    navigate(`/post/detail/${postId}`);
  };
 
  // console.log("작성: ",URL.createObjectURL(image) )
  return (
    <>
      <div className="pageBg" >
      <Header />
        <br/> 
        <div className="pageBox">
          <div className="reviewAboutPostBox">
            <div className="fileBox">
                {image.map((img, index) => (
                  <div className="imgBg" key={index}>
                    <div className="imgBox">
                      <img src={`/upload/${img}`} alt={`Image ${index}`} style={{ height: "13vh", maxWidth: "10vw",minWidth: "10vw" }} />
                    </div>
                  </div>
                ))} 
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