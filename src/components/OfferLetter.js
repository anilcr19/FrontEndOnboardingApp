import React from "react";
import { useState } from "react";
import jsPDF from "jspdf";
import Button from 'react-bootstrap/Button';
import Navbar from './Navbar'
import axios from 'axios'
import { toast,ToastContainer } from "react-toastify";
import { useSSRSafeId } from "@react-aria/ssr";
import { BsFillCalculatorFill } from "react-icons/bs";
import { FaBlackTie } from "react-icons/fa";
 function OfferLetter(){
    
    console.log(localStorage.getItem('userdata'));
    
    const[username,setUsername]=useState(JSON.parse(localStorage.getItem('userdata')).username);
    const[salary,setSalary]=useState(JSON.parse(localStorage.getItem('userdata')).salary);
    const[role,setRole]=useState(JSON.parse(localStorage.getItem('userdata')).role);
    const[firstname,setFirstname]=useState(JSON.parse(localStorage.getItem('userdata')).firstname);
    const[lastname,setLastname]=useState(JSON.parse(localStorage.getItem('userdata')).lastname);
    const[authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);
    const[employee,setEmployee]=useState();
    const[status,setStatus]=useState(false);
    const [department,setDepartment]=useState( JSON.parse(localStorage.getItem("userdata")).department.department)

    var generatePDF = () => {
        var doc = new jsPDF("p","pt","a4");
        console.log("here");
        doc.html(document.querySelector(".content"), {
            callback : function(pdf){
                pdf.save("OfferLetter.pdf");
                
            }
        })
    }
    const submitForm = ()=>{
        alert("OfferLetter Downloaded")
    }
    const sendStatus=()=>{
        
            axios.post(`http://localhost:8017/offerstatus/${localStorage.getItem("username")}`).then((res)=>{
                console.log(res);
                toast.success("status updated");
                document.getElementById("offstat").innerHTML="You Accepted";
                document.getElementById("offstat").disabled="true";
            }).catch((res)=>{
                console.log(res);
                toast.error("sorry some error");
            })

    }
    const offerStyle={
        textAlign:"center",
        color:"Black",
        fontSize:"23px"
    }
    const mystyle={
        color: "white",
        padding: "10px",
        fontFamily: "Arial",
        display: "flex",
        justifyContent: "center"
    }
   
    const viewStatus=async()=>{
        console.log(employee);
        await axios.get(`http://localhost:8017/userdetails/${employee}`).then(res=>{
            console.log(res);
            console.log(res.data.offerAcceptance);
            if(res.data.offerAcceptance){
               document.getElementById("true").style.display='block';
           }
           else {
                document.getElementById("false").style.display='block';
           }

        }).catch(res=>{
         console.log(res);
        })
    }
    return(
        authid==3?
        <div>
            <Navbar/>
            <br></br>
            <p style={offerStyle}>Enter the username of the Candidate whose Offer Acceptance Status you want to check</p>
            <div style={mystyle}>
                  <input type="email" size="30" onChange={(e)=>{setEmployee(e.target.value);
                    document.getElementById("true").style.display='none';
                    document.getElementById("false").style.display='none';
                    }} className="btn btn-outline-secondary"/>
                  <button type="submit" className="btn btn-primary" onClick={viewStatus} style={{marginLeft:10}}>Check</button>
            </div>
            <center>
                <div id="offerStatus"  >
                        <div id="true"style={{  display:'none' ,color:"green" }} >The above user accepted the offer Letter</div>
                    
                        <div id="false"style={{  display:'none' ,color:"red" }}>The above user has not accepted the offer Letter</div>
                    
                    </div>
                
            </center>
            <ToastContainer/>
        </div>:
        (
      {department}=="intern"?
        <div> <Navbar/>
            <div className="content">
                <h1>Offer Letter</h1>
                <div className="agreementText">
                  {/* June 22, 2022
June 27, 2022/Intern/IN CHE DLF
<br/>
Mr {firstname}
<br/>
Plot no.nn, Road no.mm, aaaaa,bbbbb,
<br/>
ccccc
<br/>
Telangana,
India
<br/>
Dear abcd,
<br/> */}
On behalf of Virtusa Consulting Services Private Limited (“Virtusa”), We are  pleased to confirm
your Internship with us.  As an Intern, you will be eligible to a
consolidated stipend of  {salary}  per month during the term of your internship
with Virtusa.You are offered a role of {role} with us.
Please note that the internship does not create any employer - employee relationship between you
and Virtusa. Virtusa may terminate your internship at any time upon notice in its sole discretion.
<br></br>
If you are willing to join us , please click on the I accept button as soon as possible.

<br></br>
<br></br>
Sincerely
<br></br>
Sundararajan Narayanan
<br></br>
Chief People Officer & Global Head Of Human Resources
<br></br>
Virtusa Consulting Services Pvt Ltd, India
                </div>
                
            </div>
            <div className="buttons" style={{"margin": "-200px"}}>
                <Button onClick={generatePDF} type="primary"> Download </Button>
                {/* <Button onClick={submitForm}> Save </Button> */}

                {
               JSON.parse(localStorage.getItem("userdata")).offerAcceptance==true?
               <Button  className="btn btn-success"> You accepted </Button>:
               <Button id="offstat" onClick={sendStatus} type="success"> I Accept </Button>

            }

            </div>
            <ToastContainer/>
        </div>
       
        :(<div> <Navbar/>
        <div className="content">
            <h1>Offer Letter</h1>
            <div className="agreementText">
            
    We are pleased to offer you the role  {role} in the department of {department}  with a monthly pay of {salary}/-
    at  Virtusa Consulting Services Private Limited (“Virtusa”). 
    Our company is impressed with your talent and knowledge. We are very happy to offer you this role. 
Further information regarding completion of onboarding process will be shared to you, once you click on the "I Accept" button.

<br></br>
<br></br>
If you are willing to join us , please click on the I accept button as soon as possible.
<br></br>
<br></br>
Sincerely
<br></br>
Sundararajan Narayanan
<br></br>
Chief People Officer & Global Head Of Human Resources
<br></br>
Virtusa Consulting Services Pvt Ltd, India
            </div>
            
        </div>
        <div className="buttons" style={{"margin": "-200px"}}>

            {
               JSON.parse(localStorage.getItem("userdata")).offerAcceptance==true?
               <Button  className="btn btn-success"> You accepted </Button>:
               <Button id="offstat" onClick={sendStatus} type="success"> I Accept </Button>

            }


           
            <Button onClick={generatePDF} type="primary"> Download </Button>
            {/* <Button onClick={submitForm}> Save </Button> */}
        </div>
        <ToastContainer/>
    </div>)
        )

    );
}

export default OfferLetter;









