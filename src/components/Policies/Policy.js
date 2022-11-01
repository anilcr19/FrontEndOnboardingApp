import React, { useEffect, useState } from 'react'
import SideNavbar from '../Navbar'

import { Card,Button ,Form,FormText, Toast} from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import '../Details.css'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Policy.css';
import NDA from './NDA';
import IT from './IT';
import HR from './HR';
import PolicyNav from './PolicyNav';
import axios from 'axios';

function Policy() {
  // useEffect(()=>{
  //     var url  = `http://localhost:8017/userdetails/${localStorage.getItem('username')}`
  //     axios.get(url).then(data => {
  //             localStorage.setItem('authority', data.data.authorities[0].id);
  //             console.log("authority: "+localStorage.getItem('authority'));
  //     }).catch(err=>console.log("error brr"));
  // },[]);
 
  

  const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);
  const [policiesStatus, setPoliciesStatus] = useState([]);
  const [active, setActive] = useState(1);
    const viewDetails =()=>{
      var em = document.getElementById("cemail").value;
      axios.get(`http://localhost:8017/userdetails/${em}`).then(res=>{
          console.log("itp: "+res.data.itPolicy);
          console.log("hrp: "+res.data.hrPolicy);
          console.log("ndap: "+res.data.ndaPolicy);
          setPoliciesStatus({
              itPolicy : res.data.itPolicy,
              hrPolicy : res.data.hrPolicy,
              ndaPolicy: res.data.ndaPolicy
          })
          
          document.getElementById("card").style.display='block';
          
          toast.success("details fetched succesfully");
      }).catch(res=>toast.error("sorry try again"))

}
    
    return (
      authid == '3' ? 
      (<div>
          <SideNavbar/>
          <div   className='details  ' style={{display: 'flex',  justifyContent:'center', alignItems:'center',alignContent:'center'}}>
  
              <div class="form-group row mt-5">
                  <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Enter Email<b className='req'> *</b></label>
                  <div class="col-sm-10">
                    <input type="email" id='cemail'  class="form-control form-control-sm"   placeholder='enter email address' name='cemail' />
                  </div>
                  <center>  <Button     style={{  width:'5cm'  }}  className='btn btn-primary' onClick={viewDetails} > View Details</Button></center>
              </div>
              <Card  id="card"  className="card-details mt-5">
              <Card.Body>
                <Table borderless>
                <tbody>
                <tr>
                <td><b>NDA Agreement :</b></td>
                <td>{policiesStatus.ndaPolicy?<p style={{ color:'green'  }} >Accepted</p>:
                <p style={{ color:'red' }} >Not Accepted</p>}</td>
                </tr>
                <tr>
                <td><b>IT Agreement :</b></td>
                <td>{policiesStatus.itPolicy?<p style={{ color:'green'  }} >Accepted</p>:
                <p style={{ color:'red' }} >Not Accepted</p>}</td>
                </tr>
                <tr>
                <td><b>HR Agreement :</b></td>
                <td>{policiesStatus.hrPolicy?<p style={{ color:'green'  }} >Accepted</p>:
                <p style={{ color:'red' }} >Not Accepted</p>}</td>
                </tr>
                </tbody>
                </Table>
              </Card.Body>
              </Card>
          </div>
          <ToastContainer />
          </div>)
        
        :(
          <div id="policy"> 
              <SideNavbar/>
              <PolicyNav setActive = {setActive} active = {active}/>
              {active===1 && <NDA />}
              {active===2 && <IT />}
              {active===3 && <HR />}
          </div>
        )
  )
}

export default Policy