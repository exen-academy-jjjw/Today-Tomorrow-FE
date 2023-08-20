import React, { useEffect, useState } from "react";
import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailReview, deleteReview } from "../../modules/redux/reviewSlice";

import { getCookie } from "../cookie/cookie";
import { fetchPostDetails } from "../../modules/redux/postSlice.js";

function ReviewDetail(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const nickname = getCookie("nickname");

  // 리뷰
  const [data, setData] = useState("");
  const [user, setUser] = useState("");

  // 이미지
  const [image, setImage] = useState([]);

  useEffect(() => {
    async function detailData() {
        const res = await dispatch(fetchPostDetails(postId));  
        setUser(res.payload.nickname);

        const response = await dispatch(detailReview(postId));
        setData(response.payload.reviewContent);
        setImage(response.payload.fileUrlList);
      }
    detailData();
  }, [dispatch, postId]);

  // 리뷰 삭제 처리
  const deleteHandler = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('리뷰를 삭제하시겠습니까?');
    if (isConfirmed) {
      const res = await dispatch(deleteReview(postId));
    
      if(res.payload === 200) {
        window.location.reload();
      }
    }
  };
 
  return (
    <>
      <div className="reviewBox">
        {image.length === 0 ? null :
          <>
            <div className="fileBox">
              {image.map((img, index) => (
                <div className="imgBg" key={index}>
                  <div className="imgBox">
                    <img src={img} alt={`Image ${index}`} style={{ height: "13vh" ,minWidth: "10vw" }} />
                  </div>
                </div>
              ))} 
            </div>
          </>
        }
        <div className="reviewDetailBox">
          <p>{data}</p>
        </div>  
        {nickname === user ? (
          <div className="reviewAddBtnBox">
            <button className="reviewAddBtn" onClick={() => navigate(`/review/update/${postId}`)}>Review Update</button>
            <button className="reviewAddBtn" onClick={deleteHandler}>Review Delete</button>
          </div>
        ):null}
      </div>
    </>
  )
}

export default ReviewDetail;