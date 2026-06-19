import React, { Component } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackendService from '../services/BackendService';
import { useSelector, useDispatch } from "react-redux";
import * as setLoggedUser from "../actions/LoggedInUser.jsx";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { variables } from './Variables.jsx';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox
} from 'mdb-react-ui-kit';


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // set in globle state
  const [IsUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setuserId] = useState('');
  const [userName, setuserName] = useState('');
  const [userRole, setuserRole] = useState('');
  const [FormInput_emailId, setFormInput_emailId] = useState('');
  const [FormInput_password, setFormInput_password] = useState('');

  //*** Popup message  */ 
  const [open, setOpen] = React.useState(false);
  const [Action, setAction] = React.useState('success');
  const [ActionMessage, setActionMessage] = React.useState('');
  const vertical = 'top', horizontal = 'center';

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //Popup message end************************************* */


  // Handle the onChnage event and set user intput to state variable
  function onChangeHandler(e) {
    console.log(e.target.id + ':' + e.target.value);
    switch (e.target.id) {
      case "loginId":
        setFormInput_emailId(e.target.value);
        break;
      case "Password":
        setFormInput_password(e.target.value);
        break;

    }
  }

  function btnUserLogin(e) {
    e.preventDefault();


    let objLogin = {
      EmailID: FormInput_emailId,
      Password: FormInput_password
    };

    console.log('data for api' + JSON.stringify(objLogin));
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(objLogin.EmailID)) {
      alert('Please enter a valid email address')
      return
    }
    if (objLogin.Password.length < 3) {
      alert('Please enter a valid password')
      return
    }
    // call api
    BackendService.UserLogin(JSON.stringify(objLogin)).then(res => {

      if (res.data.id === 0 || res.data.id === null || res.data.id === undefined) {
        alert('Invalid login ID or Password');
        return

      }
      else {

        // setting up cookies
        bake_cookie(variables.key_IsUserLoggedIn, 'true');
        bake_cookie(variables.key_userRole, res.data.userRole);
        bake_cookie(variables.key_userName, res.data.name);
        bake_cookie(variables.key_userMobile, res.data.mobileNo);
        bake_cookie(variables.key_userId, res.data.id);
        bake_cookie(variables.key_imageName, res.data.imageName);

        // dispatching action to set logged user data to redux store
        dispatch(setLoggedUser.setIsUserLoggedIn('true'));
        dispatch(setLoggedUser.setUserEmailId(res.data.EmailID));
        dispatch(setLoggedUser.setUserId(res.data.id));
        dispatch(setLoggedUser.setUserName(res.data.Name));
        dispatch(setLoggedUser.setUserRole(res.data.userRole));
        //alert('Login is successful');
        setAction('success')
        setActionMessage('Logged in successful')
        setOpen(true)

        setTimeout(() => {
          navigate('/');
        }, 2000);

      }
    });
  }


  return (
    <>
      <MDBContainer>
        <MDBRow className="justify-content-center my-2">
          <MDBCard className='w-100'>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='10' lg='12'>
                  <h4 className="fw-normal mb-5" style={{ color: '#4835d4' }}>User Login Form</h4>

                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size='lg' />
                    <MDBInput label='Your login ID' id='loginId' type='text' className='w-100' onChange={onChangeHandler} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg' />
                    <MDBInput label='Your password' id='Password' type='password' onChange={onChangeHandler} />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className='mb-4'>
                <MDBCol>
                  <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md='10' lg='12'>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={btnUserLogin}>Login</MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className='d-flex flex-row align-items-center mb-4'>
                <MDBCol>
                  <a href='#/UserRegistration' style={{ fontSize:'14px' }}>Register</a>
                </MDBCol>
                <MDBCol>
                  <a href='#/PasswordReset'  style={{ fontSize:'14px' }}>Forgot password?</a>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
      <div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity={Action} sx={{ width: '100%' }}>
              {ActionMessage}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </>
  )
} export default Login
