import React from 'react'
import Navbar from './Navbar'
import {useState} from 'react';
import jsPDF from "jspdf";
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify';

function ServiceBond() {
  var documents={
    'filename' : '' ,
    'username': localStorage.getItem("username") 

  }
  const[authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);
  const[employee,setEmployee]=useState();
  const [docurl,setDocUrl]=useState(documents);


  const mystyle={
    color: "white",
    padding: "10px",
    fontFamily: "Arial",
    display: "flex",
    justifyContent: "center"
  }

  var generatePDF = () => {
    var doc = new jsPDF("p","pt","a4");
    doc.html(document.querySelector(".content"), {
        callback : function(pdf){
            pdf.save("ServiceBond.pdf");
            
        }
    })
}
const openInNewTab = url => {
  console.log(url);
  window.open(url, '_blank', 'noopener,noreferrer');
};
var urlservicebond="";
const viewServiceBond=async()=>{
  
  console.log(employee)
await axios.get(`http://localhost:8017/userdetails/${employee}`).then(res=>{
         
         urlservicebond=res.data.servicebond;
         console.log(res);
         document.getElementById("url").style.display='block';
         document.getElementById("servicebondurl").value=res.data.servicebond;

     }).catch(res=>{
      console.log(res);
     })
}
const postDetails=(e)=>{
  
  //document.getElementById('docsave').disabled=true;
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "project-pdf");
      data.append("cloud_name", "charan464");
      console.log(data);
      fetch("https://api.cloudinary.com/v1_1/charan464/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url);
   
          docurl[e.target.name]=data.url;
          console.log(docurl);

          //document.getElementById('docsave').disabled=false;
              
        })
        .catch((err) => {
          console.log(err);
         // document.getElementById('docsave').disabled=false;
              
        
        });
} 
const saveDocuemnts=()=>{
 // docurl["username"]=document.getElementById("cs").value;
  console.log(docurl);

  axios({
    method:'POST',
    url:`http://localhost:8017/saveServiceBond`,
    headers:{
      'Authorization':'Bearer '  + localStorage.getItem('USER_KEY'),
      'Content-Type': 'application/json'
  },
   data:docurl
  }).then((res)=>{
    console.log(res);
    toast.success("documents are  saved successfully");
  }).catch(res=>{
    console.log(res);
    toast.error("try again");
  })
}

  return (
   
      authid==3?
      <div>
        <Navbar/>
  
        <div className='docs' style={{display: 'flex',  justifyContent:'center', alignItems:'center',alignContent:'center'}}>
            <p class="mt-2" >Enter the username of the Candidate whose Documents you want to check</p>
           
            <div class="form-group row mt-2">
       <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3"> Email
       <b className='req'> *</b>
       </label>
        <div class="col-sm-10">
        <input type="email"  class="form-control form-control-sm"  id="cs"

        onChange={(e)=>{ setEmployee (e.target.value);

          document.getElementById("url").style.display='none';}}
        
         />
        </div>

        <center><Button     style={{  width:'5cm'  }}  className='btn btn-primary mb-5' onClick={viewServiceBond} > Check </Button>
        </center>
        </div></div>





       <center><div id="url" style={{  display:'none'  }} >
        <Button onClick={ e=> openInNewTab(e.target.value)  }  value="" id="servicebondurl" className="btn btn-success" style={{marginRight:"10px" ,marginTop:"30px"}}>View ServiceBond</Button> 
       
      </div></center>
      </div>
      :
      (
    <div> 
      <Navbar/>
        <h1 style={{textAlign:"center" ,marginTop:"20px"}}>Service Bond</h1>
        <div  className="content">
        
        THIS AGREEMENT is made on the (present date)___ between (Virtusa Consulting Services Private Limited (“Virtusa”)) .
        
        (Name of the appointee)__ residing at (Address of the employee) ___ (Hereinafter called the “Employee”) of the other part.

 

WHEREAS

The company is desirous of appointing (Name of the appointee)__ as its (Designation) ___ and the Employee has  agreed to on the terms and conditions outlined here below.


<br></br>
<br></br>
NOW THIS AGREEMENT WITNESSES AS FOLLOW:
<br></br>
<br></br>
1. The said (Name of the appointee) ____is hereby appointed as the (Designation) ___ of the company and he will hold the said office, subject to the provisions made hereinafter, for the term of (Duration with the organization) ___ from the date of this agreement. As a guarantee you are agreed to keep your all-original education certificates with the custody of (Organization Name) ____.
<br></br><br></br>
2. Your monthly salary package will be as per the Annexure I. Based on the periodic reviews your compensation package may differ as per the compensation Policy applicable to other employees of your category in respective department.
<br></br><br></br>
3. The Employee shall perform such duties and exercises such powers as may from time to time be assigned to or vested in him by the Board of Directors of the company.
<br></br><br></br>
4. The Employee shall, unless prevented by ill health or any unavoidable cause, during the continuance of the term of his office devote his whole time, attention and abilities to the business of the company.
<br></br><br></br>
5. The Employee shall obey the orders from time to time of the Board of Directors of the company and in all respect conform to and comply with the directions given and regulation made by the Board. He shall well and faithfully serve the company to the best of his abilities and shall make his utmost endeavors to promote interests of the company.
<br></br><br></br>
6. The said Employee shall not resign his office of Engineer Trainee –Database/operations till the end of this contract period.
<br></br><br></br>
7. The company may terminate this agreement at any time before the expiry of the stipulated term by giving one month´s notice in writing to him. The company can terminate your contract any time if you-
<br></br><br></br>


• Commit any material or persistent breach of any of the provisions contained.
<br></br><br></br>
• Be guilty of any default, misconduct or neglect in the discharge of your duties affecting the business of the company.
<br></br><br></br>




Signature:
<br></br><br></br>
___________________
<br></br>
(candidate's Name)
<br></br><br></br>


</div>
 <div style={{margin:"490px"}}>
  <div>
    <p style={{color:"red"}}>
    **  Download the Service Bond format and Kindly Upload the Service Bond in the same format after the neccessary changes.
    </p>
  </div>
  
 <Button onClick={generatePDF} type="primary" > Download </Button>
 <form  style={{marginTop:"20px",display:"flex"}}>
 <label class="uploadLabel" style={{backgroundColor:'rgba(241, 187, 10, 0.97)',color:'black'}} >
      <i class="fas fa-file-upload"></i> 

    <input  name='resume' type="file" class="uploadButton"    onChange={(e) => postDetails(e)}/>
    Upload
    </label>
  <Button  onClick={saveDocuemnts} style={{marginLeft:"360px"}}> Submit </Button>
</form>
 </div>
 <ToastContainer/>
   </div>
      )
  )
}

export default ServiceBond;