import logo from './logo.svg';
///import './App.css';
import {BrowserRouter ,Navigate,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import React from 'react';
import Details  from './components/Details';
import Letter  from './components/Documents';
import DocsVerify from './components/OfferLetter';
import ServiceBond from './components/ServiceBond';
import BankDetails from './components/BankDetails/BankDetails';
import Training from './components/Courses';
import Policy from './components/Policies/Policy';
import Documents from './components/Documents'
import { useNavigate } from 'react-router-dom';
import Login from './components/Login'
import Navbar from './components/Navbar';
import OfferLetter from './components/OfferLetter';
import {fetchUserData} from './components/api/Authentication'
import ProtectedRoute from './components/ProtectedRoute'



function App() {

window.onbeforeunload=closingCode;

function closingCode()
{
     // localStorage.clear();
}


  return (
    <div className="App">

      <BrowserRouter>
      {
        <Routes>
        <Route path='/logout' exact element={<Login/>}></Route>
        <Route path='/' exact  element={<Login/>}> </Route>
        
            <Route path='/home' exact  element={<ProtectedRoute><Home/></ProtectedRoute>}> </Route>
              <Route path='/details' exact element={<ProtectedRoute><Details/></ProtectedRoute>}> </Route>
              <Route path='/documents' exact element={<ProtectedRoute><Documents/></ProtectedRoute>}> </Route>
              <Route path='/offer' exact element={<ProtectedRoute><OfferLetter/></ProtectedRoute>}> </Route>
              <Route path='/service' exact element={<ProtectedRoute><ServiceBond/></ProtectedRoute>}> </Route>
              <Route path='/policy' exact element={<ProtectedRoute><Policy/></ProtectedRoute>}> </Route>
              <Route path='/bank' exact element={<ProtectedRoute><BankDetails/></ProtectedRoute>}> </Route>
              <Route path='/courses' exact element={<ProtectedRoute><Training/></ProtectedRoute>}> </Route>
              
           </Routes> 
      }

      
    
      </BrowserRouter>
    </div>
  );
}

export default App;
