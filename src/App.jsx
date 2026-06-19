import { useState } from 'react'
import React, { useEffect } from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import FooterComponent from './components/FooterComponent';
import UserRegistration from './components/UserRegistration';
import Product from './components/Product';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import ListUser from './components/ListUser';
import ProfileViewPage from './components/ProfileViewPage';
import { useSelector, useDispatch } from "react-redux";
import * as changeLoggedUser from "./actions/LoggedInUser.jsx";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import Cart from './components/Cart';
import { variables } from './components/Variables.jsx';
import OrderList from './components/OrderList';
import CreateProduct from './components/CreateProduct';
import ProductsList from './components/ProductsList';
import PasswordReset from './components/PasswordReset.jsx';
import SuccessPage from './components/SuccessPage.jsx';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CircularProgressBar from './components/CircularProgressBar.jsx';
import ProBackendService from './services/ProBackendService.js';


import {
  MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink,
  MDBNavbarToggler, MDBNavbarBrand, MDBCollapse
} from 'mdb-react-ui-kit';
import { Circle } from '@mui/icons-material';

function App() {

  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // get the logged state from redux store
  const userLoggedId = useSelector((state) => state.LoginReducer);
  
  if (sessionStorage.getItem("cartItems") == null) {
    sessionStorage.setItem("cartItems", "[]");
    console.log('Cart has been initialized');
    //console.log('Intems:' + sessionStorage.getItem("cartItems"));
  }
  else console.log('Cart Intems at page load:' + sessionStorage.getItem("cartItems"));
  const SessionValue = sessionStorage.getItem("cartItems");
  let CartItems = JSON.parse(SessionValue);

  useEffect(() => {
    const getData = async () => {
      console.log('page URL: ' + window.location.href)
      ProBackendService.GetAllProduct().then(res => {
        if (res.data) {
          setLoading(false);
          console.log('Server response recived: ' + isLoading)
        }
      });
    }
    getData();

  }, []);



  return (
    <div>
      <Router>
        { (isLoading === true && JSON.stringify(window.location.href) != JSON.stringify('https://eshopping-webapp.azurewebsites.net/#/Cart')) ?
          <div className="App">
            <CircularProgressBar />
          </div>
          :
          <div>
            <MDBNavbar expand='lg' dark bgColor='primary'>
              <MDBContainer fluid>
                <MDBNavbarBrand href='#'>Take Away: e-order</MDBNavbarBrand>
                <MDBNavbarToggler
                  type='button'
                  data-target='#navbarColor02'
                  aria-controls='navbarColor02'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                  onClick={() => setShowNavColor(!showNavColor)}>
                  <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse show={showNavColor} navbar>
                  <MDBNavbarNav left >
                    <MDBNavbarItem>
                      <MDBNavbarLink aria-current='page' href='#/'> </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink aria-current='page' href='#/'> Home </MDBNavbarLink>
                    </MDBNavbarItem>
                    {JSON.stringify(read_cookie(variables.key_userRole)) === JSON.stringify('admin') ?
                      <MDBNavbarItem>
                        <MDBNavbarLink href='#/ProductsList'>Product</MDBNavbarLink>
                      </MDBNavbarItem>
                      :
                      <MDBNavbarItem>
                      </MDBNavbarItem>
                    }
                    <MDBNavbarItem>
                      <MDBNavbarLink href='#/Menu'>Menu</MDBNavbarLink>
                    </MDBNavbarItem>

                    {JSON.stringify(read_cookie(variables.key_userRole)) === JSON.stringify('admin') ?
                      <MDBNavbarItem>
                        <MDBNavbarLink href='#/OrderList'>Order</MDBNavbarLink>
                      </MDBNavbarItem>
                      :
                      <MDBNavbarItem>
                      </MDBNavbarItem>
                    }

                    {JSON.stringify(read_cookie(variables.key_userRole)) === JSON.stringify('admin') ?
                      <MDBNavbarItem>
                        <MDBNavbarLink href='#/ListUser'>Customer</MDBNavbarLink>
                      </MDBNavbarItem>
                      :
                      <MDBNavbarItem>
                      </MDBNavbarItem>
                    }
                  </MDBNavbarNav>
                  <MDBNavbarNav className='justify-content-end'>
                    <MDBNavbarItem>
                      <MDBNavbarLink className="waves-effect waves-light" to="#!" href='#/Cart'>
                        {CartItems.length}
                        <MDBIcon icon="cis-fas fa-cart-shopping" />
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    </MDBNavbarItem>
                    {JSON.stringify(read_cookie(variables.key_IsUserLoggedIn)) === JSON.stringify('true') ?
                      <MDBNavbarItem>
                      </MDBNavbarItem>
                      :
                      <MDBNavbarItem>
                        <MDBNavbarLink href='#/UserRegistration'>
                          <MDBIcon far icon="sign-up" />Sign Up
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                    }

                    {JSON.stringify(read_cookie(variables.key_IsUserLoggedIn)) === JSON.stringify('true') ?
                      <MDBNavbarItem>
                        <MDBNavbarLink className="waves-effect waves-light" href='#/ProfileViewPage'>
                          {read_cookie(variables.key_userName)}
                          <img src={variables.PHOTO_URL + read_cookie(variables.key_imageName)}
                            className="rounded-circle" height="22" alt="Avatar" loading="lazy" />
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                      :
                      <MDBNavbarItem>
                        <MDBNavbarLink className="waves-effect waves-light" href='#/Login'>
                          <MDBIcon far icon="user" />Login
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                    }
                    {JSON.stringify(read_cookie(variables.key_IsUserLoggedIn)) === JSON.stringify('true') ?
                      <MDBNavbarItem>
                        <MDBNavbarLink href='#/Logout'>
                          Logout</MDBNavbarLink>
                      </MDBNavbarItem>
                      :
                      <MDBNavbarItem>
                      </MDBNavbarItem>
                    }
                  </MDBNavbarNav>

                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            <div className="App container" >
              <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route path='/Menu' element={<Product />}></Route>
                <Route path='/UserRegistration' element={<UserRegistration />}></Route>
                <Route path='/Login' element={<Login />}></Route>
                <Route path='/Logout' element={<Logout />}></Route>
                <Route path='/ListUser' element={<ListUser />}></Route>
                <Route path='/ProfileViewPage' element={<ProfileViewPage />}></Route>
                <Route path='/Cart' element={<Cart />}></Route>
                <Route path='/OrderList' element={<OrderList />}></Route>
                <Route path='/CreateProduct' element={<CreateProduct />}></Route>
                <Route path='/ProductsList' element={<ProductsList />}></Route>
                <Route path='/PasswordReset' element={<PasswordReset />}></Route>
                <Route path='/SuccessPage' element={<SuccessPage />}></Route>
              </Routes>
            </div>
          </div>
        }
      </Router>
      <div className="fixed-bottom">
      </div >
    </div >
  );
} export default App