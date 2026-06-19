import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { variables } from './Variables.jsx';
import { MDBAnimation, MDBView, MDBMask } from "mdbreact";




function Home() {
  const [pageData, setpageData] = useState([])
  const [percentage, setPercentage] = useState(0);

  const fadeImages = [
    variables.PHOTO_URL + 'Home_1.jpg',
    variables.PHOTO_URL + 'Home_2.jpg',
    variables.PHOTO_URL + 'Home_3.jpg',
    variables.PHOTO_URL + 'Home_4.jpg',
    variables.PHOTO_URL + 'Home_5.jpg',

  ];
  const fadeImages1 = [
    variables.PHOTO_URL + 'maxresdefault.jpg',
    variables.PHOTO_URL + 'kadai-paneer-gravy.jpg',
    variables.PHOTO_URL + 'full-meal1.jpg',
    variables.PHOTO_URL + 'full-meal.jpg',

  ];


  return (

    <div> <br />
      <div className="slide-container">
        <div className="heading">

          <h2><strong>Snacks- new year offers</strong></h2>

        </div>
        <Fade>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[0]} alt="slide" />
            </div>
            <h3>Discount- 30%</h3>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[1]} alt="slide" />
            </div>
            <h3>Discount- 30%</h3>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[2]} alt="slide" />
            </div>
            <h3>Discount- 30%</h3>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[3]} alt="slide" />
            </div>
            <h3>Discount- 30%</h3>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages[4]} alt="slide" />
            </div>
            <h3>Discount- 20%</h3>
          </div>
        </Fade>
      </div>

      <br />
      <br />
      <div className="slide-container">
        <div className="heading">
          <h2><strong>Meal- new year offers</strong></h2>
        </div>
        <Fade>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages1[0]} alt="slide" />
            </div>
            <h3>Discount- 50%</h3>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages1[1]} alt="slide" />
            </div>
            <h3>Discount- 30%</h3>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages1[2]} alt="slide" />
            </div>
            <h3>Discount- 32%</h3>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={fadeImages1[3]} alt="slide" />
            </div>
            <h3>Discount- 30%</h3>
          </div>
        </Fade>
      </div>
      <br />
      <br />
      <div  style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
        <p><strong> Please go to<a href='#/Menu'> menu </a> page and place your order</strong></p>
      </div>
      <br />
    </div>
  );
} export default Home
