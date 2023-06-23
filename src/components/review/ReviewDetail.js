import React, { useEffect, useState } from "react";
import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailReview, deleteReview } from "../../modules/redux/reviewSlice";

function ReviewDetail(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  // 리뷰
  const [data, setData] = useState("");
  // 이미지
  const [image, setImage] = useState([]);

  useEffect(() => {
    async function detailData() {
        const response = await dispatch(detailReview(postId));
        setData(response.payload.reviewContent);
        setImage(response.payload.fileUrlList);
      }
    detailData();
  }, [dispatch, postId]);

  // 리뷰 삭제 처리
  const deleteHandler = async (e) => {
    e.preventDefault();
    dispatch(deleteReview(postId));
    // navigate가 안되서 window.location.reload로 변경
    window.location.reload();
    // navigate(`/post/detail/${postId}`);
  };
 
  console.log(data);
  return (
    <>
      <div className="reviewBox">
        <div className="fileBox">
            {image.map((img, index) => (
              <div className="imgBg" key={index}>
                <div className="imgBox">
                  <img src={img} alt={`Image ${index}`} style={{ height: "13vh" ,minWidth: "10vw" }} />
                </div>
              </div>
            ))} 
        </div>
        <div className="reviewDetailBox">
          <p>{data}</p>
        </div>  
        <div className="reviewAddBtnBox">
          <button className="reviewAddBtn" onClick={() => navigate(`/review/update/${postId}`)}>Review Update</button>
          <button className="reviewAddBtn" onClick={deleteHandler}>Review Delete</button>
        </div>
      </div>
    </>
  )
}

export default ReviewDetail;