import React, {useEffect, useState} from "react";
import jsPDF from "jspdf";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NDA(){
    var url  = `http://localhost:8017/policies/${localStorage.username}` 
    useEffect(()=>{
            axios.get(url).then( data => {
                setCheck(data.data.ndaPolicy);
                setAlreadyAccepted(data.data.ndaPolicy);
            })
    },[]);
    const [alreadyAccepted, setAlreadyAccepted] = useState(false);
    const [check, setCheck] = useState(false);
    const checkboxHandler = () => {
        setCheck(!check);
    }
    const submitForm = ()=>{
        var ndaPolicy = {
            ndaPolicy : true
        }
        axios.put(url,ndaPolicy).then(res=>{
            toast.success("NDA Agreement signed !")
        setAlreadyAccepted(check);
        
        })
    }
    var generatePDF = () => {
        var doc = new jsPDF("p","pt","a4");
        doc.html(document.querySelector(".content"), {
            callback : function(pdf){
                pdf.save("NDA.pdf");
            }
        })
    }
    const notAccepted = ()=>{
        return(
            <div>
            <div className="content">
                <h1>NDA Agreement</h1>
                <div className="agreementText">
                Either Party shall use the Confidential Information solely in furtherance of the actual or potential business relationship between the parties.  
                The parties shall not use the Confidential Information in any way that is directly or indirectly detrimental to the other party or its subsidiaries or affiliates, and shall not disclose the Confidential Information to any unauthorized third party.<br></br><br></br>
                Parties shall ensure that access to Confidential Information is granted only to those of its employees or agents (“Representatives”) who have a demonstrated need to know such information in order to carry out the business purpose of this Agreement. 
                Prior to disclosing any Confidential Information to such Representatives, party shall inform them of the confidential nature of the information and their obligation to refrain from disclosure of the Confidential Information. 
                Each party and its Representatives will take all reasonable measures to maintain the confidentiality of the Confidential Information, but in no event less than the measures it uses for its own information of similar type. 
                Parties and its Representatives shall not disclose to any person including, without limitation, any corporation, sovereign, partnership, limited liability company, entity or individual 
                <br></br><br></br>(i) the fact that any investigations, discussions or negotiations are taking place concerning the actual or potential business relationship between the parties, 
                <br></br>(ii) that it has requested or received Confidential Information, or 
                <br></br>(iii) any of the terms, conditions or any other fact about the actual or potential business relationship.  
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