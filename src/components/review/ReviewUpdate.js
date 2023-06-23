import React, { useEffect, useState } from "react";
import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header.js";
import { updateReview, detailReview } from "../../modules/redux/reviewSlice";

function ReviewUpdate(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  // 이미지
  const [image, setImage] = useState([]);

  // 리뷰
  const [data, setData] = useState("");


  useEffect(() => {
    async function detailData() {
        const response = await dispatch(detailReview(postId));
        setData(response.payload.reviewContent);
        setImage(response.payload.fileUrlList);
      }
    detailData();
  }, [dispatch, postId]);

  // 리뷰 수정
  const handleContentChange = (e) => {
    setData(e.target.value);
  };


  // 이미지 및 리뷰 수정
  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    // for (let i = 0; i <image.length; i++) {
    //  formData.append("fileUrl", image[i]);
    //  console.log("수정전 Url:", image[i] );

    // }
    // for (let i = 0; i < image.length; i++) {
    //   formData.append("fileUrl", image[i]);
    //   console.log("수정 Url:", image[i] );
    // }
    formData.append("reviewContent", data);
    console.log("데이터:", data );

    try {
      await dispatch(updateReview({ postId, total: formData }));
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
                {/* <input type="file" className="file" id="fileTxt" name="fileUrl" multiple readOnly/> */}
                {image.map((img, index) => (
                  <div className="imgBg" key={index}>
                    <div className="imgBox">
                        <img src={img} alt={`Image ${index}`} style={{ height: "13vh", minWidth: "10vw" }} />
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
      </div>
    </>
  )
}

export default ReviewUpdate;