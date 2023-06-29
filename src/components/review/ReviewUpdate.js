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
  const [formData, setFormData] = useState(new FormData());

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

    // 이미지 개수 최대 3개까지 등록 가능
    if (images.length + newImages.length <= 3) {
      setImages((prevImages) => [...prevImages, ...newImages]);

      // formData에 이미지 파일 추가
      const formDataCopy = new FormData();
      for (let i = 0; i < newImages.length; i++) {
        formDataCopy.append("fileUrl", newImages[i].file);
      }
      formDataCopy.append("reviewContent", data);
      setFormData(formDataCopy);
    } else {
      window.alert("이미지는 최대 3개까지 등록 가능합니다.");
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // formData에서 삭제된 이미지 제거
    formData.delete("fileUrl");
    for (let i = 0; i < newImages.length; i++) {
      formData.append("fileUrl", newImages[i].file);
    }
  };

  const handleContentChange = (e) => {
    setData(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 리뷰 내용 추가
    formData.append("reviewContent", data);
    
    try {
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
                      {img.preview ? (
                        <>
                          <img src={img.preview} alt={`Image ${index}`} style={{ height: "13vh", minWidth: "10vw" }} />
                          <button type="button" className="imgBtn" onClick={() => handleDeleteImage(index)}> X </button>
                        </>
                      ) : (
                        <img src={img} alt={`Image ${index}`} style={{ height: "13vh", minWidth: "10vw" }} />
                      )}
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