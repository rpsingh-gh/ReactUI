import React, { Component } from 'react'
import BackendService from '../services/BackendService';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { withRouter } from './withRouter.jsx';
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox
} from 'mdb-react-ui-kit';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha
} from "react-simple-captcha";

class UserRegistration extends Component {
  constructor(props) {
    super(props)
    // Bind the onChnage event to this object
    this.onChangeHandler = this.onChangeHandler.bind(this);
    //create a state to hold the user input values
    this.state = {
      FormInput_name: '',
      FormInput_emailId: '',
      FormInput_mobileNo: '',
      FormInput_password: '',
      FormInput_repeat_password: '',
      FormInput_subs_Newsletter: 'false',
      FormInput_ModifiedBy: '',
      IsUserExists: false,
      user_captcha_input: ''
    }
  }
  componentDidMount() {
    loadCaptchaEnginge(6, 'white', 'red', 'lower');
  }
  // Handle the onChnage event and set user intput to state variable
  onChangeHandler = (e) => {
    switch (e.target.id) {
      case "name":
        this.setState({ FormInput_name: e.target.value });
        break;
      case "emailId":
        this.setState({ FormInput_emailId: e.target.value });
        break;
      case "mobileNo":
        this.setState({ FormInput_mobileNo: e.target.value });
        break;
      case "password":
        this.setState({ FormInput_password: e.target.value });
        break;
      case "repeat_password":
        this.setState({ FormInput_repeat_password: e.target.value });
        break;
      case "subs_Newsletter":
        this.setState({ FormInput_subs_Newsletter: e.target.checked.toString() });
        break;
      case "user_captcha":
        this.setState({ user_captcha_input: e.target.value });
        break;
    }
  }

  createUser = (e) => {
    e.preventDefault();

    // Create a user object to pass to backend API
    let UserObj = {
      Name: this.state.FormInput_name,
      EmailID: this.state.FormInput_emailId,
      MobileNo: this.state.FormInput_mobileNo,
      Password: this.state.FormInput_password,
      Subs_Newsletter: this.state.FormInput_subs_Newsletter,
      VerificationCode: ''


    };
    // write to console to checj if object is correcly formated and have all required fields
    // console.log('User => ' + JSON.stringify(UserObj));

    // validation the mandatory input fields
    if (UserObj.Name.length < 5) {
      alert('Please enter your full name, having minimum 5 letters')
      return
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(UserObj.EmailID)) {
      alert('Please enter a valid email address')
      return
    }

    if (UserObj.MobileNo.length != 10) {
      alert('Please enter valid mobile number of 10 digit')
      return
    }
    if (UserObj.Password.length < 3 || UserObj.Password.length > 8) {
      alert('Please enter a password, having minimum 3 and maximum 8 char')
      return
    }
    if (UserObj.Password != this.state.FormInput_repeat_password) {
      alert('Rrepeat password does not match with the password');
      return
    }
    if (validateCaptcha(this.state.user_captcha_input) == false) {
      alert("Captcha Does Not Match");
      loadCaptchaEnginge(6, 'white', 'red', 'lower');
      this.setState({ user_captcha_input: '' });
      return
    }
    let parmObj = {
      parmName: 'EmailID',
      paramValue: this.state.FormInput_emailId,

    };
    // email existence validation
    BackendService.GetUserdataByParameter(JSON.stringify(parmObj)).then(res => {

      if (res.data.emailID != null || res.data.emailID != undefined) {
        alert('Entered email ID is already registered in our system');
        return
      }
      else {

        BackendService.createUser(JSON.stringify(UserObj)).then(res => {
          // alert('Your registration is successful');
          // after form submitted to server, clear all valued from from.
          if (res.data.status == 'OK') {

            this.state = {
              FormInput_name: '',
              FormInput_emailId: '',
              FormInput_mobileNo: '',
              FormInput_password: '',
              FormInput_repeat_password: '',
              FormInput_subs_Newsletter: 'false',
              FormInput_IsVerified: 'false',
              FormInput_VerificationCode: '',
              FormInput_IsActive: 'false',
              FormInput_ModifiedBy: ''
            };
            setTimeout(() => {
              this.props.navigate('/SuccessPage')
            }, 1000);
          }
          else alert('Somehting went wrong please try again')

        });

      }
    });

    // call api



  }


  // ********** HTML
  render() {
    return (
      <MDBContainer>
        <MDBRow className="justify-content-center my-2">
          <MDBCard className='w-100'>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='10' lg='12'>
                  <h4 className="fw-normal mb-5" style={{ color: '#4835d4' }}>Sign up Infomation</h4>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <MDBIcon fas icon="user me-3" size='lg' />
                    <MDBInput label='Your Full Name' id='name' type='text' value={this.state.FormInput_name} onChange={this.onChangeHandler} />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-3">
                    <MDBIcon fas icon="envelope me-3" size='lg' />
                    <MDBInput label='Your Email Address' id='emailId' type='email' value={this.state.FormInput_emailId} onChange={this.onChangeHandler} />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-3">
                    <MDBIcon fas icon="phone me-3" size='lg' />
                    <MDBInput label='Your Mobile Number' id='mobileNo' type='Number' value={this.state.FormInput_mobileNo} onChange={this.onChangeHandler} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <MDBIcon fas icon="lock me-3" size='lg' />
                    <MDBInput label='Your Password' id='password' type='password' value={this.state.FormInput_password} onChange={this.onChangeHandler} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg' />
                    <MDBInput label='Repeat your password' id='repeat_password' type='password' value={this.state.FormInput_repeat_password} onChange={this.onChangeHandler} />
                  </div>

                  <div className='mb-4'>
                    <MDBCheckbox id='subs_Newsletter' label='Subscribe to our newsletter' onChange={this.onChangeHandler} />
                  </div>
                  <div className='mb-4'>
                    <LoadCanvasTemplate />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBInput label='Fill the captcha shown above' id='user_captcha' type='text' value={this.state.user_captcha_input} onChange={this.onChangeHandler} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={this.createUser}>Register</MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    )
  }
} export default withRouter(UserRegistration);
