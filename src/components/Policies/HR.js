import React, {useEffect, useState} from "react";
import jsPDF from "jspdf";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HR(){
    var url = `http://localhost:8017/policies/${localStorage.username}`;
    useEffect(()=>{
        axios.get(url).then(data => {
            setUserData(data.data);
            setCheck(data.data.hrPolicy);
            setAlreadyAccepted(data.data.hrPolicy);
        })
    },[]);
    const [userData, setUserData] = useState([]);
    const [alreadyAccepted, setAlreadyAccepted] = useState(false);
    const [check, setCheck] = useState(false);
    const submitForm = ()=>{
        
        var hr = {
            hrPolicy : true
        }
        axios.put(url, hr).then(res=>{
            toast.success("HR Agreement signed !");
            setAlreadyAccepted(check);
        })
    }
    const checkboxHandler = () => {
        setCheck(!check);
    }
    var generatePDF = () => {
        var doc = new jsPDF("p","pt","a4");
        doc.html(document.querySelector(".content"), {
            callback : function(pdf){
                pdf.save("HR.pdf");
            }
        })
    }
    const notAccepted = ()=>{
        return(
            <div>
            <div className="content">
                <h1>HR Agreement</h1>
                <div className="agreementText">
                This contract is made between Virtusa and {userData.firstname} {userData.lastname}. This document constitutes an employment agreement between the two parties , 
 where the Employer desires to retain the services of the Employee, and the Employee desires to render such services, these terms and conditions are set forth.<br></br>
In consideration of this mutual understanding, the parties agree to the following terms and conditions:<br></br><br></br>
The Employee agrees that he or she will faithfully and to the best of their ability to carry out the duties and responsibilities communicated to them by the Employer. The Employee shall comply with all company policies, rules and procedures at all times.<br></br><br></br>
As a {userData.role}, it is the duty of the Employee to perform all essential job functions and duties. From time to time, the Employer may also add other duties within the reasonable scope of the Employee’s work.<br></br><br></br>
The Employee has the right to participate in any benefits plans offered by the Employer.<br></br><br></br>
It is understood that the first 2 months of employment constitutes a probationary period. During this time, the Employee is not eligible for paid time off or other benefits. During this time, the Employer also exercises the right to terminate employment at any time without advanced notice.<br></br><br></br>
                </div>
                <div className="agree">
                    <input className='accept' type="checkbox" checked={check} onChange={checkboxHandler}/>
                    <label className="acceptText">I accept the agreement</label>
                </div>
            </div>
            <div className="buttons">
                <Button onClick={generatePDF} type="primary"> Download </Button>
                <Button onClick={submitForm} disabled={!check} variant={check?"primary":"secondary"}> Save </Button>
                {/* {check && <Button onClick={submitForm}> Save </Button>}
                {!check && <Button onClick={submitForm} disabled variant="secondary"> Save </Button>} */}
            </div>
        </div>
        )
    }
    const accepted = () => {
        return(
            <div className="acceptedPage">
                <h1>Policy Accepted</h1>
            </div>
        )
    }

    const renderPage = () => {
        if(alreadyAccepted)   return accepted();
        else        return notAccepted();
    }
    return(
        <>
            {   renderPage()    }
            <ToastContainer />
        </>
    );
}