import React, { Component } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { variables } from './Variables.jsx';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import {
         MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBBtn,  MDBCol
       }from 'mdb-react-ui-kit';

function SuccessPage() {

    const navigate = useNavigate();

    function btnUserLogout(e) {
        e.preventDefault();
        navigate('/');

    }
    return (
        <>
        <MDBContainer>
        <MDBRow className="justify-content-center my-2">
          <MDBCard className='w-100'>
            <MDBCardBody>
              <MDBRow>
                <MDBCol className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <h2 className="fw-normal mb-1" style={{ color: '#4835d4' }}>Congratulations!</h2>
                <h7 className="fw-normal mb-5" style={{ color: '#4835d4' }}>Your registration is successful.</h7>
                <p className="fw-normal mb-3" style={{ color: '#4835d4' }}>A verification email is sent to your email address.</p>
                <p> If you have already verified, please click here to <a href='#/Login'>login</a></p>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          </MDBRow>
        </MDBContainer>
      </>
    );

} export default SuccessPage