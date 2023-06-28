import React, { useEffect, useState } from "react";
import "./css/reviewpageStyle.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header.js";
import { updateReview, detailReview } from "../../modules/redux/reviewSlice";
import Dropzone from "react-dropzone";

function ReviewUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  const [data, setData] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function detailData() {
      const response = await dispatch(detailReview(postId));
      setData(response.payload.reviewContent);
      setImages([...response.payload.fileUrlList]);
    }
    detailData();
  }, [dispatch, postId]);

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

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  // const handleDeleteImage = async (index) => {
  //   const newImages = [...images];
  //   const deletedImage = newImages.splice(index, 1)[0];
  //   setImages(newImages);
    
    // 이미지 삭제를 서버에 요청
    // try {
    //   await axios.delete(`/api/images/${deletedImage.id}`); // 이미지 식별자(id)를 전달하여 삭제 요청
    //   console.log("이미지 삭제 성공");
    // } catch (error) {
    //   console.log("이미지 삭제 실패:", error);
    // }
  // };


  const handleContentChange = (e) => {
    setData(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    console.log(e);
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("fileUrl", images[i].file);
    }
    formData.append("reviewContent", data);

    try {
      console.log("폼데이터: ", formData);
      await dispatch(updateReview({ postId, total: formData }));
      navigate(`/post/detail/${postId}`);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="pageBg">
        <Header />
        <br />
        <div className="pageBox">
          <form onSubmit={onSubmitHandler}>
            <div className="reviewBox">
              <div className="fileBox">
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <button type="button">Image</button>
                    </div>
                  )}
                </Dropzone>
                <br />
                {images.map((img, index) => (
                  <div className="imgBg" key={index}>
                    <div className="imgBox">
                      <img src={img.preview || img} alt={`Image ${index}`} style={{ height: "13vh", minWidth: "10vw" }} />
                      <button type="button" className="imgBtn" onClick={() => handleDeleteImage(index)} > X </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reviewCreateBox">
                <textarea className="review" placeholder="리뷰 작성" name="reviewContent" value={data} onChange={handleContentChange} />
              </div>
              <div className="reviewAddBtnBox">
                <button className="reviewAddBtn">Review update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ReviewUpdate;