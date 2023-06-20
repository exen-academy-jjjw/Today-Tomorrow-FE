import React from "react";
import {BsBucketFill} from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import { FcManager } from "react-icons/fc";


function ReviewpageHeader(){
  // 밑에 div(Bucket)에 main으로 가는 onClick 추가함.
  const navigate = useNavigate();

  return(
    <>
      <section style={{display: "flex", justifyContent:"space-between", alignItems:"center", marginTop:"3rem", border:"2px solid #D6E4E5", borderRadius:"50px", marginLeft:"1rem", marginRight:"1rem", padding:"15px 0", backgroundColor:"#fff"}}>
        <div style={{marginLeft:"2rem"}}  onClick={() => navigate('/home')}>
          <BsBucketFill style={{color:"orange", fontSize:"2rem", marginRight:"0.5rem"}}/>
          <span style={{cursor: "pointer", display:"inline-block", fontSize:"1.5rem",  transform: "translate(0, -20%)"}}>Bucket</span>
        </div>
        
        <div style={{display: "flex", justifyContent:"space-between", marginRight:"2rem"}}>
          <div style={{marginLeft:"2rem"}}  onClick={() => navigate('/mypage')}>
              <FcManager style={{cursor: "pointer", fontSize:"2rem"}}/>
          </div>
          <button style={{cursor: "pointer", padding:"8px 15px", border:"1px solid #9BA4B5", backgroundColor:"#fff" , borderRadius:"10px"}} >logout</button>
        </div>
      </section>
    </>
  )
}

export default ReviewpageHeader;