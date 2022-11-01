import React, { useEffect } from 'react'
import Axios from 'axios'
import Navbar from '../Navbar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import './BankDetails.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast ,ToastContainer } from 'react-toastify';
function BankDetails() {

  useEffect(()=>{
      // (async ()=>{
      //   await setUsername(localStorage.username);
      //   var url = `http://localhost:8017/bankDetails/${username}`;
      //   console.log(url+" hehe here it is")
      //   var data = await Axios.get(url);
      //   await setPan(data.pan);
      //   await setACNumber(data.accountNumber);
      //   await setIfsc(data.ifsc);
      //   await setFirstEmployment(data.firstEmployment);
      // })();
      setUsername(localStorage.username);
      var url = `http://localhost:8017/bankDetails/${localStorage.username}`;
      console.log(url+" hehe here it is")
      Axios.get(url).then((data)=>{
        console.log(data)
        setPan(data.data.pan);
        setACNumber(data.data.accountNumber);
        setIfsc(data.data.ifsc);
        setFirstEmployment(data.data.firstEmployment);
        if(pan!==null)  setNewUser(false);
        console.log(newUser+" hehe first emp")
      })
  },[]) 
  const [newUser,setNewUser] = useState(true);
  const [username,setUsername] = useState("");
  const [pan,setPan]=useState("")
  const [ACNumber,setACNumber]=useState("")
  const [ifsc, setIfsc] = useState("");
  const [firstEmployment, setFirstEmployment] = useState(false);
  const handleSubmit=async (e)=>{  
      e.preventDefault();
      var details = {
        username : username,
        pan : pan,
        ifsc : ifsc,
        accountNumber : ACNumber,
        firstEmployment : firstEmployment
      }
      var url = "http://localhost:8017/bankDetails";
      if(!newUser){
        url+="/"+username;
        var res = await Axios.put(url,details);
        console.log("put called");
      }
      else{
        var res = await Axios.post(url,details);
        console.log("post called");
      }
      console.log(res);
       toast.success ("  details saved");
  }
  return (
    <div className='bank'><Navbar/>
        <h1 style={{display: 'flex',  justifyContent:'center', margin: '50px 0' }}>PAN & Bank Details</h1>
        <div className="bankCard">
            {/* <Card.Body> */}
            
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="pan" required>
                    <Col md={4}><Form.Label>Permanent Account Number (PAN)</Form.Label></Col>
                    <Col md={8}><Form.Control  required={true}   type="text" placeholder="Enter PAN" onChange={e=>{setPan(e.target.value)}} value={pan} /></Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="acno" required>
                  <Col md={4}><Form.Label>Account Number</Form.Label></Col>
                  <Col md={8}><Form.Control type="text" placeholder="Enter A/C Number" onChange={e=>{setACNumber(e.target.value)}} value={ACNumber}  /></Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="ifsc" required>
                  <Col md={4}><Form.Label>Branch IFSC Code</Form.Label></Col>
                  <Col md={8}><Form.Control type="text" placeholder="Enter IFSC Code" onChange={e=>{setIfsc(e.target.value)}}  value={ifsc} /></Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="firstEmployment">
                  <Col md={4}><Form.Label>Is this your first employment ?</Form.Label></Col>
                  <Col md={8}>
                    <BootstrapSwitchButton 
                      checked={firstEmployment}
                      width={100} 
                      onlabel="Yes" 
                      offlabel="No" 
                      onChange={(checked) => {
                        setFirstEmployment(checked)
                    }}
                      /> 
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                      <Button className="save"  type="submit" onClick={(e)=>handleSubmit(e)}>Submit</Button>
                  </Form.Group>
                </Form>
          
            {/* </Card.Body> */}
        </div>
        <ToastContainer/>
    </div>

  )
}

export default BankDetails