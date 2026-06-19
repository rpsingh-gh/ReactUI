import ProBackendService from '../services/ProBackendService';
import { useState } from 'react'
import React, { useEffect } from 'react';
import { MDBAnimation, MDBView } from "mdbreact";
import { variables } from './Variables';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {
    MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCol, MDBCardText, MDBRipple,
    MDBCardHeader, MDBTypography, MDBTooltip, MDBListGroup, MDBListGroupItem, MDBIcon
} from 'mdb-react-ui-kit';



function Product() {

    const navigate = useNavigate();
    const [Product, setProduct] = useState([])


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



    useEffect(() => {
        const getData = async () => {

            ProBackendService.GetAllProduct().then(res => {
                setProduct(res.data);
            });
        }
        getData();
        // check cart in session storage
        if (sessionStorage.getItem("cartItems") == null) {
            sessionStorage.setItem("cartItems", "[]");
            console.log('Cart has been initialized');
            //console.log('Intems:' + sessionStorage.getItem("cartItems"));
        }
        else console.log('Cart Intems at page load:' + sessionStorage.getItem("cartItems"));

        console.log('Products.:' + JSON.stringify(Product));

    }, []);

    function btnAddCart(product) {
        // e.preventDefault();
        console.log('button click:' + JSON.stringify(product));
        // Retrieving data from session storage
        const cartItems = sessionStorage.getItem("cartItems");
        if (cartItems === "[]") {

            let AddToCart = [{
                pID: product.pID.toString(),
                pName: product.pName,
                pType: product.pType,
                pQuantity: 1,
                PricePerItem: product.pricePerItem,
                pImageName: product.pImageName,
                pDiscountPercentage: product.pDiscount.toString()

            }];
            sessionStorage.setItem("cartItems", JSON.stringify(AddToCart));
            setAction('success')
            setActionMessage('Item is added to cart successfully!')
            setOpen(true)

        }
        else {

            let AddToCart = {
                pID: product.pID.toString(),
                pName: product.pName,
                pType: product.pType,
                pQuantity: 1,
                PricePerItem: product.pricePerItem,
                pImageName: product.pImageName,
                pDiscountPercentage: product.pDiscount.toString()


            };

            let CartItems = JSON.parse(cartItems);

            //check and add if product item alreay not present in the cart
            const found = CartItems.some(el => el.pID === AddToCart.pID);
            if (!found) {
                CartItems.push(AddToCart)
                setAction('success')
                setActionMessage('Item is added to cart successfully!')
                setOpen(true)
            }
            else {
                setAction('warning')
                setActionMessage('Item is already added to cart!')
                setOpen(true)
            };
            // set JSON array again to session storage
            sessionStorage.setItem("cartItems", JSON.stringify(CartItems));

        }
    }

    return (


        <section className="h-100 gradient-custom">
            <MDBContainer className="py-0 h-100">
                <MDBRow className="justify-content-center my-2">
                    <MDBCard className="mb-4">
                        <MDBCardHeader className="py-1">
                            <MDBTypography tag="h5" className="mb-0">
                                Product List
                            </MDBTypography>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBRow >
                                {
                                    Product.map(product =>
                                        JSON.stringify(product.pActive) === 'true' ?
                                            <MDBCol lg="3" md="4" className="mb-4 mb-lg-0">
                                                <MDBView hover zoom></MDBView>
                                                <MDBRipple rippleTag="a" href="#!" className="bg-image rounded hover-zoom hover-overlay"                        >
                                                    <img className='img-fluid shadow-4'
                                                        src={variables.PHOTO_URL + product.pImageName}
                                                    />
                                                    <MDBListGroup style={{ minWidth: '10rem' }} light small>
                                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <MDBCardText className="text-black-50">{product.pName} €{product.pricePerItem}</MDBCardText>
                                                            </div>
                                                            <span>
                                                                <MDBCardText className="text-muted text-info bg-gray">  Discount {product.pDiscount}%</MDBCardText>
                                                            </span>
                                                        </MDBListGroupItem>
                                                    </MDBListGroup>
                                                </MDBRipple>

                                                <MDBRow >
                                                    <MDBCol sm="12">
                                                        <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2"
                                                            title="Add to cart">
                                                            <MDBIcon fas icon="cis-fas fa-cart-shopping" onClick={() => btnAddCart(product)} />
                                                        </MDBTooltip>
                                                        <MDBTooltip wrapperProps={{ size: "sm", color: "danger" }} wrapperClass="me-1 mb-2"
                                                            title="Move to the wish list">
                                                            <MDBIcon fas icon="heart" />
                                                        </MDBTooltip>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCol> : ''

                                    )}
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
        </section>
    );
} export default Product
