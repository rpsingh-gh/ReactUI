import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { variables } from './Variables';
import { MDBAnimation, MDBView, MDBMask } from "mdbreact";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import ProBackendService from "../services/ProBackendService";
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography, MDBCardHeader,
    MDBRipple, MDBTooltip, MDBListGroup, MDBListGroupItem, MDBCardText, MDBTextArea, MDBModalFooter
} from "mdb-react-ui-kit";

function Cart() {

    const navigate = useNavigate();
    const [checkOut, setCheckOut] = React.useState(false);
    const [Quantity, setQuantity] = React.useState(0);
    let SessionValue = sessionStorage.getItem("cartItems");
    let CartItems = JSON.parse(SessionValue);

    // useEffect(() => {
    //   SessionValue = sessionStorage.getItem("cartItems");
    //   CartItems = JSON.parse(SessionValue);
    //   console.log(JSON.stringify(Quantity));
    // }, [Quantity]);

    const [InitialState, setInitialState] = useState({
        doorNumber: '',
        address: "",
        ddlCity: 0,
        zipCode: '',
    });

    const [Address, setAddress] = useState(InitialState)
    // Handle the onChnage event and set user intput to state variable
    const handleChange = (event) => {
        const { id, value } = event.target;
        setAddress((Address) => ({ ...Address, [id]: value }));
        console.log('On chnage event:' + JSON.stringify(event.target.value))

    }



    let GrossTotal = CartItems.reduce((Total, item) => Total = Total + (item.PricePerItem * item.pQuantity), 0)
    let Discount = CartItems.reduce((Total, item) => Total = Total + ((item.PricePerItem * item.pQuantity) * item.pDiscountPercentage) / 100, 0)

    // get date expected delivery date
    var ExpectedDeliveryDate = new Date()
    ExpectedDeliveryDate.setDate(ExpectedDeliveryDate.getDate() + 0)      // Add a 3 days


    function addQuantity(ToUpdateObj) {

        let UpdatedObj = CartItems.map(item =>

            item.pID === ToUpdateObj.pID ? { ...ToUpdateObj, pQuantity: ToUpdateObj.pQuantity + 1 } : item
        );
        sessionStorage.setItem("cartItems", JSON.stringify(UpdatedObj));
        //setQuantity(Quantity+1);
        window.location.reload(true);

    }

    function removeQuantity(ToUpdateObj) {

        if (ToUpdateObj.pQuantity > 1) {

            let UpdatedObj = CartItems.map(item =>

                item.pID === ToUpdateObj.pID ? { ...ToUpdateObj, pQuantity: ToUpdateObj.pQuantity - 1 } : item

            );

            sessionStorage.setItem("cartItems", JSON.stringify(UpdatedObj));
            window.location.reload(true);

        }

    }

    function deletItem(ToDeleteObj) {

        let upadetedObj = CartItems.filter(item =>

            item.pID !== ToDeleteObj.pID)
        sessionStorage.setItem("cartItems", JSON.stringify(upadetedObj));
        console.log("newarry" + JSON.stringify(upadetedObj))
        window.location.reload(true);
    }

    function CheckOut(e) {
        e.preventDefault();
        //alert(JSON.stringify(read_cookie(variables.key_userName)));
        const cartItems = sessionStorage.getItem("cartItems");
        if (cartItems === "[]") {
            alert('Your cart is empty');
            return
        };
        if (JSON.stringify(read_cookie(variables.key_IsUserLoggedIn)) === JSON.stringify('false')) {
            alert('Please login to place your order');
            return
        };
        if (JSON.stringify(read_cookie(variables.key_userName)) === '[]') {
            alert('Please login to place your order');
            return
        };

        setCheckOut(true);

    }

    function CreateOrder(e) {
        e.preventDefault();
        console.log(Address.ddlCity);
        const cartItems = sessionStorage.getItem("cartItems");
        if (cartItems === "[]") {
            alert('Your cart is empty');
            return
        };
        if (JSON.stringify(read_cookie(variables.key_IsUserLoggedIn)) === JSON.stringify('false')) {
            alert('Please login to place your order');
            return
        };
        if (Address.address.length < 20 || Address.address.length > 250) {
            alert('Please enter a valid address minimum 20 char')
            return
        }
        if (Address.doorNumber.length < 3 || Address.doorNumber.length > 5) {
            alert('Please enter a valid door number between 3 to 5 digit')
            return
        }
        if (Address.ddlCity < 1) {
            alert('Please select your city')
            return
        }
        if (Address.zipCode.length < 5 || Address.zipCode.length > 8) {
            alert('Please enter a valid zip Code between 5 to 8 digit')
            return
        }

        let ProductOrder = {
            OrderValue: GrossTotal,
            DiscountValue: Discount,
            NetPaidValue: (GrossTotal - Discount).toFixed(2),
            ExpectedDeliveryDate: ExpectedDeliveryDate.toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }),
            CustomerId: read_cookie('userId'),
            orderItems: CartItems
        };

        // call api

        ProBackendService.CreateOrder(JSON.stringify(ProductOrder)).then(res => {
            sessionStorage.setItem("cartItems", "[]");
            alert('Order has been placed successfull. Your order Id is:' + res.data);
            navigate('/Menu');

        });


    }


    return (

        <section className="h-100 gradient-custom">
            <MDBContainer className="py-0 h-100">
                <MDBRow className="justify-content-center my-2">
                    <MDBCol md="8">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-1">
                                <MDBTypography tag="h5" className="mb-0">
                                    Your cart items
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBRow >
                                    {
                                        CartItems.map(
                                            item =>

                                                <MDBCol lg="6" md="12" className="mb-4 mb-lg-0">
                                                    <MDBRipple rippleTag="a" href="#!" className="bg-image rounded hover-zoom hover-overlay"                        >
                                                        <img className='img-fluid shadow-4'
                                                            src={variables.PHOTO_URL + item.pImageName} />
                                                    </MDBRipple>
                                                    <MDBListGroup style={{ minWidth: '15rem' }} light small>
                                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <MDBCardText className="text-black-50">{item.pName} €{item.PricePerItem}</MDBCardText>
                                                            </div>
                                                            <span>
                                                                <MDBCardText className="text-muted text-info bg-gray">  Discount {item.pDiscountPercentage}%</MDBCardText>
                                                            </span>
                                                        </MDBListGroupItem>
                                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                            <div className="d-flex flex-row align-items-center mb-3" style={{ maxWidth: "200px", height: "45px" }} >
                                                                <MDBBtn className="d-flex justify-content-center" color='link' rounded size='sm' onClick={() => removeQuantity(item)}  >
                                                                    <div style={{ maxWidth: "200px", height: "45px" }} >
                                                                        <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-5"
                                                                            title="Remove Quantity">
                                                                            <MDBIcon fas icon="minus" />
                                                                        </MDBTooltip>
                                                                    </div>
                                                                </MDBBtn>
                                                                <MDBInput defaultValue={item.pQuantity} label="Quantity" />
                                                                <MDBBtn className="d-flex justify-content-center" color='link' rounded size='sm' onClick={() => addQuantity(item)} >
                                                                    <div style={{ maxWidth: "200px", height: "45px" }} >
                                                                        <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-2 mb-5"
                                                                            title="Add Quantity">
                                                                            <MDBIcon fas icon="plus" />
                                                                        </MDBTooltip>
                                                                    </div>
                                                                </MDBBtn>
                                                            </div>
                                                            <span>
                                                                <MDBTooltip wrapperProps={{ size: "sm", color: "danger" }} wrapperClass="me-1 mb-4"
                                                                    title="Remove item">
                                                                    <MDBIcon fas icon="trash" onClick={() => deletItem(item)} />
                                                                </MDBTooltip>
                                                            </span>
                                                        </MDBListGroupItem>
                                                    </MDBListGroup>
                                                </MDBCol>
                                        )}
                                    <MDBRow><MDBCol><hr className="my-4" /></MDBCol></MDBRow>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>
                                <MDBTypography tag="h5" className="mb-0">
                                    Summary
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBRow >
                                    <MDBListGroup style={{ minWidth: '15rem' }} light small>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <MDBCardText className="text-muted"><strong>Item Name:</strong>Price x Quantity</MDBCardText>
                                            </div>
                                            <span>
                                                <strong>Total Price</strong>
                                            </span>
                                        </MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBRow>
                                {
                                    CartItems.map(
                                        item =>
                                            <MDBRow >
                                                <MDBListGroup style={{ minWidth: '15rem' }} light small>
                                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                            <MDBCardText className="text-muted"><strong>{item.pName} </strong> :{item.PricePerItem} x  {item.pQuantity}</MDBCardText>
                                                        </div>
                                                        <span>
                                                            €{(item.PricePerItem * item.pQuantity).toFixed(2)}
                                                        </span>
                                                    </MDBListGroupItem>
                                                </MDBListGroup>
                                            </MDBRow>
                                    )}
                                <hr className="my-4" />
                                <MDBListGroup style={{ minWidth: '15rem' }} light small>
                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <MDBCardText className="text-muted">Gross Total (including VAT)</MDBCardText>
                                        </div>
                                        <span>
                                            €{GrossTotal.toFixed(2)}
                                        </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <MDBCardText className="text-muted">Gross Discount</MDBCardText>
                                        </div>
                                        <span>
                                            €{Discount.toFixed(2)}
                                        </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <MDBCardText className="text-muted">Delivery Charges</MDBCardText>
                                        </div>
                                        <span>
                                            € 00.00
                                        </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <MDBCardText className="text-muted"><strong>Net Payment</strong></MDBCardText>
                                        </div>
                                        <span>
                                            <strong>€{(GrossTotal - Discount).toFixed(2)}</strong>
                                        </span>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="mb-4">
                            <MDBCardHeader>
                                <MDBTypography tag="h5" className="mb-0">
                                    Additional infomation
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBRow >
                                    <MDBListGroup style={{ minWidth: '15rem' }} light small>
                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <MDBCardText className="text-muted">Expected Pickup</MDBCardText>
                                            </div>
                                            <span>
                                                within 60 minutes

                                            </span>
                                        </MDBListGroupItem>
                                        <br />
                                    </MDBListGroup>
                                </MDBRow>
                            </MDBCardBody>

                            {checkOut === false ?
                                <div>
                                    <MDBCardBody>
                                        <MDBRow >
                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <MDBBtn block size="lg" onClick={CheckOut}>
                                                    <div className="justify-content-center">
                                                        <span>Check Out Now</span>
                                                    </div>
                                                </MDBBtn>
                                            </div>
                                        </MDBRow>
                                    </MDBCardBody>
                                </div> :
                                <div>

                                    <MDBCardHeader className="py-1">
                                        <MDBTypography tag="h5" className="mb-0">
                                            Delivery address
                                        </MDBTypography>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBInput label='Your Full Name' value={read_cookie(variables.key_userName)} id='name' type='text' disabled='true' />
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBInput label='Your Mobile Number' value={read_cookie(variables.key_userMobile)} id='mobileNo' type='Number' disabled='true' />
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBTextArea label='Address' id="address" rows={1} className="mb-4" value={Address.address} onChange={handleChange} />
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBInput label='Door Number' id='doorNumber' type='Number' value={Address.doorNumber} onChange={handleChange} />
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <select class="browser-default custom-select" id="ddlCity" selected={Address.ddlCity} onChange={handleChange}>
                                                <option value="0" selected>Select City</option>
                                                <option value="1">Porto</option>
                                                <option value="2">Braga</option>
                                                <option value="3">Vila do Conde</option>
                                            </select>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBInput label='ZIP Code' id='zipCode' type='Number' value={Address.zipCode} onChange={handleChange} />

                                        </div>
                                        <br />
                                    </MDBCardBody>

                                    <MDBCardHeader className="py-1">
                                        <MDBTypography tag="h5" className="mb-0">
                                            Payment details we accept:
                                            <MDBCardImage className="me-2" width="45px"
                                                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                                alt="Visa" />
                                            <MDBCardImage className="me-2" width="45px"
                                                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                                alt="Mastercard" />
                                        </MDBTypography>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBInput label='Card Holder Name' id='name' type='text' value="Mr. XXXXXXX XXXXXXX" disabled="true" />
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBInput label='Card Number' id='CardNumber' type='text' value="XXXX-XXXX-XXXX-5462" disabled="true" />
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBInput label="Expire" id="form2" type="text" placeholder="MM/YYYY" wrapperClass="mb-3" value="05/2030" disabled="true" />
                                            <MDBInput label="CVV" id="form4" type="password" placeholder="CVV" wrapperClass="mb-3" value="***" disabled="true" />
                                        </div>
                                        <div class="text-danger text-center">
                                            <p><MDBAnimation type="pulse" infinite color>
                                                <MDBCardText class="text-danger text-center">Payment details are not required</MDBCardText></MDBAnimation>
                                            </p>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBBtn block size="lg" onClick={CreateOrder}>
                                                <div className="justify-content-center">
                                                    <span>Pay & Order Now €{(GrossTotal - Discount).toFixed(2)}</span>
                                                </div>
                                            </MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </div>

                            }

                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
export default Cart
