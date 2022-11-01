import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import './Login.css'
import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import {signUser} from '../Service/api'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {userLogin,fetchUserData} from './api/Authentication'
import { Toast } from 'react-bootstrap';

function Login() {

    const [login,setLogin]=useState(true)

    




    const navigate= useNavigate();

    const initialValue = {
       userName:'',
       password:''
  }

  const initialValue2 = {
    username:'',
    oldpassword:'',
    newpassword:'',
    confirmnewpassword:''

}


    const [user,setUser]=useState(initialValue);

    const onValueChange=(e)=>
  {
        setUser({...user,[e.target.name]:e.target.value})
        //console.log(user);
  }


  const [user2,setUser2]=useState(initialValue2);

  const onValueChange2=(e)=>
{
      setUser2({...user2,[e.target.name]:e.target.value})
      //console.log(user);
}



  const handleChangePassword=()=>
  {

    var ualp="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lalp="abcdefghijklmnopqrstuvwxyz";
    var dig="0123456789";
    var sp="!@^";

      var pass=user2.newpassword;

      if(pass.length!=10)
      {
          toast.error(" Password format \n : 2 capital letters , 3 small letters , "+
          "special character followed by four digits     Your passowrd is"+ `${user2.newpassword}`);
          return
      }
      
      for(let i=0;i<2;i++)
      {
            if(!ualp.includes(pass.substr(i,1)))
            {
              toast.error(" Password format \n : 2 capital letters , 3 small letters , "+
              "special character followed by four digits    Your passowrd is"+ `${user2.newpassword}`);
              return
            }
      }


      for(let i=2;i<5;i++)
      {
            if(!lalp.includes(pass.substr(i,1)))
            {
              toast.error(" Password format \n : 2 capital letters , 3 small letters , "+
              "special character(@ or ! or ^) followed by four digits     Your passowrd is "+ `${user2.newpassword}`);
              return
            }
      }

        if(!sp.includes(pass.substr(5,1)))
        {
          toast.error(" Password format \n : 2 capital letters , 3 small letters , "+
          "special character(@ or ! or ^) followed by four digits     Your passowrd is"+ `${user2.newpassword}`);
          return
        }



      for(let i=6;i<10;i++)
      {
            if(!dig.includes(pass.substr(i,1)))
            {
              toast.error(" Password format \n : 2 capital letters , 3 small letters , "+
              "special character followed by four digits      Your passowrd is"+ `${user2.newpassword}`);
              return
            }
      }



      if(user2.newpassword!=user2.confirmnewpassword)
      {
          toast.error("New password and Confirm new password should be same");
          return 
      }

        console.log(user2);

        axios({
          method:'POST',
          url:`http://localhost:8017/changepassword`,
          headers:{
            'Content-Type': 'application/json'
        },
         data:user2
        }).then((res)=>{
         
          console.log(res);
        
          toast.success("password changed successfully");

          setLogin(!login);
         
        }).catch(res=>{
          console.log(res);

          toast.error("invalid credentials ");
          
        })


        //setLogin(!login);
  }



  


    const handleLogin= async()=>{

      if(!user.userName||!user.password)
      {
        toast.error("fill all the details");
      }

      else
      {
            userLogin(user).then(res=>{

              console.log(res);

                if(res.status===200)
                {
                  localStorage.setItem('USER_KEY',res.data.token);
                  localStorage.setItem('username',user.userName);

                  axios.get(`http://localhost:8017/userdetails/${localStorage.getItem('username')}`).then(res=>{
                    // console.log(res);
                    
                    localStorage.setItem('userdata',JSON.stringify(res.data));

                    navigate("/home");

                   }).catch(res=>{
                    console.log(res);
                   })
                  
                   

                   
                   
                }
              

            }).catch(err=>{
              console.log(err);
                 toast.warning("invaild credentials");
              })
          
      }
    }


  return ( 

      login==true
          ?
    <div>
         

    <div className='login'  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
           <div className="title"><p className='tt'>EMPLOYEE ONBOARDING SYSTEM</p></div>
           
            <Card  style={{width:'30rem',height:'20rem'}} className="card-login">
    <Card.Body>
    
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="userName"  required={true}   type="email" placeholder="Enter email" onChange={e=>{onValueChange(e)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" onChange={e=>{onValueChange(e)}}   />
      </Form.Group>
      </Form>
     
       <Button className="block mb-2"  type="submit" onClick={handleLogin}>
            login
       </Button>

        <div  style={{ display:'flex' , justifyContent:'space-between' }}  >

       <a className=" link " onClick={()=>{  setLogin(!login);}} >
            Change password
       </a>

      

       </div>
   
    </Card.Body>
  </Card>
    </div>

    

    <ToastContainer/>
    
    </div>

    :

    (
      <div>
      <div className='login'  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      
       <Card  style={{width:'30rem',height:'30rem'}} className="card-login">
      <Card.Body>

    <Form>
 <Form.Group className="mb-3" controlId="formBasicEmail">
   <Form.Label>Email address</Form.Label>
   <Form.Control name="username"  required={true}   type="email" placeholder="Enter email" onChange={e=>{onValueChange2(e)}} />
 </Form.Group>

 <Form.Group className="mb-3" controlId="formBasicPassword">
   <Form.Label>Old Password</Form.Label>
   <Form.Control name="oldpassword" type="password" placeholder="Enter Old Password" onChange={e=>{onValueChange2(e)}}   />
 </Form.Group>
   


    <Form.Group className="mb-3" >
   <Form.Label>New Password</Form.Label>
   <Form.Control name="newpassword" type="password" placeholder="Ex : CHara!4545" onChange={e=>{onValueChange2(e)}}   />
 </Form.Group>
   


    <Form.Group className="mb-3">
   <Form.Label>Confirm New Password</Form.Label>
   <Form.Control name="confirmnewpassword" type="password" placeholder="Confirm New Password" onChange={e=>{onValueChange2(e)}}   />
  </Form.Group>
    </Form>

    <Button className="block mb-3" onClick={ handleChangePassword }>Change password</Button>
    <a style={ { display:'flex' ,  justifyContent:'center' , cursor:'pointer', textDecoration:'underline'  } } onClick={ ()=>{  setLogin(!login) }}>Go to Login </a>

    </Card.Body>
    </Card>
    </div>



<ToastContainer/>

</div>

    )

   
  );
}

export default Login;