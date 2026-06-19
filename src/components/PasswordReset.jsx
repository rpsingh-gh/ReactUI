import React, { Component } from 'react'
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { variables } from './Variables.jsx';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import BackendService from '../services/BackendService';
import {
    MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBCol, MDBIcon, MDBInput
} from 'mdb-react-ui-kit';

function PasswordReset() {

    const navigate = useNavigate();
    const [IsVerificationEmailSent, setIsVerificationEmailSent] = useState(false)
    const [IsCodeVerified, setIsCodeVerified] = useState(false)
    const [FormInput_VerifiCationCode, setFormInput_VerifiCationCode] = useState('')
    const [FormInput_emailId, setFormInput_emailId] = useState('')
    const [FormInput_password, setFormInput_password] = useState('')
    const [FormInput_RepeatPassword, setFormInput_RepeatPassword] = useState('')


    function onChangeHandler(e) {
        console.log(e.target.id + ':' + e.target.value);
        switch (e.target.id) {
            case "loginId":
                setFormInput_emailId(e.target.value);
                break;
            case "Password":
                setFormInput_password(e.target.value);
                break;
            case "RepeatPassword":
                setFormInput_RepeatPassword(e.target.value);
                break;

            case "VerifiCationCode":
                setFormInput_VerifiCationCode(e.target.value);
                break;


        }
    }

    function btnVerifyEmail(e) {
        e.preventDefault();
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(FormInput_emailId)) {
            alert('Please enter a valid email address')
            return
          }

          let UserAction = {  
            userEmailId : FormInput_emailId,
            ActionName :"SendEmailVerificationCode",
            ActionCode:'0'
           }

          BackendService.UserAction(UserAction).then((res) => {
            console.log('data for api' + JSON.stringify(res.data));
            if(res.data.status=='OK' )
            {
            setIsVerificationEmailSent(true);
            }
            else if(res.data.status=='KO' )
            {
                alert('This email ID is not registered in our system')
            }
           else alert('Somehting went wrong please try again')
        });

       

    }

    function btnVerifyCode(e) {
        e.preventDefault();

        let UserAction = {  
            userEmailId : FormInput_emailId,
            ActionName :"VerificationCode",
            ActionCode:FormInput_VerifiCationCode
           }

           BackendService.UserAction(UserAction).then((res) => {
            console.log('data for api' + JSON.stringify(res.data));
            if(res.data.status=='OK' )
            {
                setIsCodeVerified(true);
                setIsVerificationEmailSent(false);
           }
           else alert('Invalid verification code')
        });
    }

    function btnResetPassword(e) {
        e.preventDefault();

        let UserAction = {
            userEmailId : FormInput_emailId,
            ActionName :"SetNewPassword",
            ActionCode:FormInput_password
          };
          if (UserAction.ActionCode.length < 3 || UserAction.ActionCode.length > 8) {
            alert('Please enter a password between 3 to 8 char')
            return
          }
          if (UserAction.ActionCode != FormInput_RepeatPassword) {
            alert('Repeat password does not match with the password');
            return
          }
        BackendService.UserAction(UserAction).then((res) => {
            console.log('data for api' + JSON.stringify(res.data));
            if(res.data.status=='OK' )
            {
                alert('Password reset is done! You will be redirected to login page')
                navigate('/Login');
           }
           else alert('Somehting went wrong please try again')
        });
        

    }


    return (
        <>
            <MDBContainer>
                <MDBRow className="justify-content-center my-2">
                    <MDBCard className='w-100'>
                        <MDBCardBody>
                            <h4 className="fw-normal mb-5" style={{ color: '#4835d4' }}>User password reset form</h4>

                            {IsCodeVerified === false ?
                            <MDBRow>
                                {IsVerificationEmailSent === false ?
                                    <MDBRow>
                                        <MDBCol md='10' lg='12'>
                                            <div className="d-flex flex-row align-items-center mb-4 ">
                                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                                <MDBInput label='Enter your email ID' id='loginId' type='text'  onChange={onChangeHandler} />
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={btnVerifyEmail}>Send a Verification Code</MDBBtn>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                    :
                                    <MDBRow>
                                        <p style={{color: '#32CD32'}}><strong>A verification code is sent to your registered email address</strong></p>

                                        <MDBCol md='10' lg='12'>
                                            <div className="d-flex flex-row align-items-center mb-4 ">
                                                <MDBIcon fas icon="lock me-3" size='lg' />
                                                <MDBInput label='Enter Verification Code' id='VerifiCationCode' type='text' onChange={onChangeHandler} />
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={btnVerifyCode} >Verify Code</MDBBtn>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                }
                            </MDBRow>
                             :
                            <MDBRow>
                                <MDBCol md='10' lg='12'>
                                    <div className="d-flex flex-row align-items-center mb-4 ">
                                        <MDBIcon fas icon="lock me-3" size='lg' />
                                        <MDBInput label='Enter new password' id='Password' type='password' onChange={onChangeHandler} />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBIcon fas icon="lock me-3" size='lg' />
                                        <MDBInput label='Repeat the password' id='RepeatPassword' type='password' onChange={onChangeHandler} />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={btnResetPassword} >Submit</MDBBtn>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                           }
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </MDBContainer>
        </>
    );
} export default PasswordReset