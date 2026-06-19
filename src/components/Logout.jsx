import React, { Component } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { variables } from './Variables.jsx';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import {
         MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBBtn,  MDBCol
       }from 'mdb-react-ui-kit';

function Logout() {

    const navigate = useNavigate();

    function btnUserLogout(e) {
        e.preventDefault();

        // setting up cookies
        delete_cookie(variables.key_IsUserLoggedIn);
        delete_cookie(variables.userId);
        delete_cookie(variables.key_userRole);
        delete_cookie(variables.key_userName);
        delete_cookie(variables.key_userId);
        bake_cookie(variables.key_IsUserLoggedIn, 'false');
        navigate('/');
        window.location.reload(true);

    }
    return (
        <>
        <MDBContainer>
        <MDBRow className="justify-content-center my-2">
          <MDBCard className='w-100'>
            <MDBCardBody>
              <MDBRow>
                <MDBCol className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <h4 className="fw-normal mb-5" style={{ color: '#4835d4' }}>You are about to be logged out!</h4>
                <h2 className="fw-normal mb-5" style={{ color: '#4835d4' }}>Are you sure?</h2>
                  <MDBBtn gradient="young-passion" size="lg" onClick={btnUserLogout}>Click to Disconnect</MDBBtn>
  
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          </MDBRow>
        </MDBContainer>
      </>
    );

} export default Logout