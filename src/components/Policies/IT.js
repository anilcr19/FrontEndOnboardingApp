import React, {useEffect, useState} from "react";
import jsPDF from "jspdf";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function IT(){
    var url = `http://localhost:8017/policies/${localStorage.username}`;
    useEffect(()=>{
        axios.get(url).then(data => {
            setCheck(data.data.itPolicy);
            setAlreadyAccepted(data.data.itPolicy);
        })
    },[]);
    const[alreadyAccepted, setAlreadyAccepted] = useState(false);
    const [check, setCheck] = useState(false);
    const submitForm = ()=>{
        
        var it = {
            itPolicy : true
        }
        axios.put(url,it).then(res=>{
            toast.success("IT Agreement signed !");
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
                pdf.save("IT.pdf");
            }
        })
    }
    const notAccepted = ()=>{
        return(
            <div>
            <div className="content">
                <h1>IT Agreement</h1>
                <div className="agreementText">
                The said user is hereby appointed in the company and he will hold the said office, subject to the provisions made hereinafter, from the date of this agreement. As a guarantee you are agreed to keep your all-original education certificates with the custody of Virtusa.<br></br><br></br>
                Based on the periodic reviews your compensation package may differ as per the compensation Policy applicable to other employees of your category in respective department.<br></br><br></br>
                The Employee shall perform such duties and exercises such powers as may from time to time be assigned to or vested in him by the Board of Directors of the company.<br></br><br></br>
                The Employee shall, unless prevented by ill health or any unavoidable cause, during the continuance of the term of his office devote his whole time, attention and abilities to the business of the company.<br></br><br></br>
                The Employee shall obey the orders from time to time of the Board of Directors of the company and in all respect conform to and comply with the directions given and regulation made by the Board. He shall well and faithfully serve the company to the best of his abilities and shall make his utmost endeavors to promote interests of the company.<br></br><br></br>
                The company may terminate this agreement at any time before the expiry of the stipulated term by giving one month´s notice in writing to him.
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