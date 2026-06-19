import React from 'react'
import ProBackendService from "../services/ProBackendService";
import { useState, useEffect } from 'react';
import {
    MDBContainer, MDBRow, MDBTable, MDBTableHead, MDBCard, MDBCardBody, MDBTableBody, MDBBtn, MDBModal, MDBCol,
    MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBCardHeader
} from 'mdb-react-ui-kit';



function OrderList() {

    const [Orders, setOrders] = useState([])
    const [OrderStatus, setOrderStatus] = useState([])
    const [OrderItems, setOrderItems] = useState([])
    const [TotalPay, setTotalPay] = useState("")
    const [StatusName, setStatusName] = useState()
    const [editModal, seteditModal] = useState(false)
    editOrder = editOrder.bind(this);


    useEffect(() => {

        const getData = async () => {

            ProBackendService.getAllOrder().then(res => {
                setOrders(res.data);
            });
        }

        const getOrderStatus = async () => {

            ProBackendService.getOrderStatus().then(res => {
                setOrderStatus(res.data);
            });
        }

        getData();
        getOrderStatus();

        // console.log('all orders: '+JSON.stringify(Order));

    }, []);

    const changeStatus = (e) => {
        // StatusId(e.target.id);
        setStatusName(e.target.value);
    }

    function editOrder(ObjOrder) {

        setStatusName(ObjOrder.statusName);
        console.log('Order ID: ' + ObjOrder.orderId)
        ProBackendService.getOrderItems(ObjOrder.orderId).then(res => {
            setOrderItems(JSON.parse(res.data));
        });
        let GrossTotal = OrderItems.reduce((Total, item) => Total = Total + (item.PricePerItem * item.pQuantity), 0)
        let Discount = OrderItems.reduce((Total, item) => Total = Total + ((item.PricePerItem * item.pQuantity) * item.pDiscountPercentage) / 100, 0)
        setTotalPay(GrossTotal - Discount)

        console.log('Order Items: ' + JSON.stringify(OrderItems))
        seteditModal(!editModal);
    }
    function edit_toggleShow() { seteditModal(!editModal); }



    return (
        <section>
            <MDBContainer>
                <MDBRow className="justify-content-center my-2">
                    <MDBCard className='w-100'>
                        <MDBCardBody>
                            <MDBRow>
                                <caption> List of Orders</caption>
                                <div class="table-responsive">
                                    <MDBTable align='middle' class="table table-sm">
                                        <MDBTableHead>
                                            <tr>
                                                <th> O. ID </th>
                                                <th>O. Value</th>
                                                <th>Dis. Value</th>
                                                <th>NP. Value</th>
                                                <th>O. Status</th>
                                                <th>Pay. Status</th>
                                                <th>Name</th>
                                                <th>Moblie</th>
                                                <th >Order Date </th>
                                                <th >Ex. Del. Date </th>
                                                <th >Action </th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {
                                                Orders.map(
                                                    item =>
                                                        <tr key={item.orderId} >
                                                            <td> {item.orderId} </td>
                                                            <td> {item.orderValue} </td>
                                                            <td> {item.discountValue}</td>
                                                            <td> {item.netPaidValue}</td>
                                                            <td>{item.statusName}</td>
                                                            <td> {item.paymentStatus.toString() === 'true' ? 'Done' : 'Pending'}</td>
                                                            <td> {item.uName}</td>
                                                            <td> {item.uMobileNo}</td>
                                                            <td> {item.orderDate.substring(0, 10)} </td>
                                                            <td> {item.expectedDeliveryDate.substring(0, 10)} </td>
                                                            <td>
                                                                <MDBBtn color='link' rounded size='sm' onClick={() => editOrder(item)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                    </svg>
                                                                </MDBBtn>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </MDBContainer>
            <div>
                <MDBModal staticBackdrop show={editModal} setShow={editModal} tabIndex='-1'>
                    <MDBModalDialog size='xl' >
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Order Details</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={edit_toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <div>
                                    <MDBContainer class="d-flex justify-content-center">
                                        <MDBRow>
                                            <MDBCol lg="12" md="12" className="mb-4 mb-lg-0">
                                                <form className="mx-3 grey-text">
                                                    <div className="d-flex flex-row align-items-center mb-3">
                                                        <select className="form-select" id='StatusId'
                                                            onChange={changeStatus}
                                                            value={StatusName}>
                                                            {OrderStatus.map(item =>
                                                                <option key={item.statusId}>
                                                                    {item.statusName}
                                                                </option>)}
                                                        </select>
                                                    </div>
                                                    <MDBBtn className="d-flex justify-content-end" size='md'>Update Order</MDBBtn>
                                                </form>
                                            </MDBCol>
                                        </MDBRow>

                                    </MDBContainer>
                                    <MDBRow><MDBCol><hr className="my-4" /></MDBCol></MDBRow>
                                    <MDBContainer>
                                        <MDBCard className='w-100' style={{ borderRadius: '25px' }}>

                                            <MDBCardBody>
                                                <MDBRow>
                                                    <caption>Order Items</caption>
                                                    <div class="table-responsive">
                                                        <MDBTable align='middle' class="table table-sm">
                                                            <MDBTableHead>
                                                                <tr>
                                                                    <th>P. ID </th>
                                                                    <th>P. Name</th>
                                                                    <th>Price</th>
                                                                    <th>Quantity</th>
                                                                    <th>TotalPrice</th>
                                                                    <th>Discount%</th>
                                                                    <th>Discount</th>
                                                                    <th>NetPay</th>
                                                                </tr>
                                                            </MDBTableHead>
                                                            <MDBTableBody>
                                                                {
                                                                    OrderItems.map(
                                                                        OItem =>
                                                                            <tr key={OItem.pId} >
                                                                                <td> {OItem.pId} </td>
                                                                                <td> {OItem.pName} </td>
                                                                                <td> {OItem.PricePerItem}</td>
                                                                                <td>{OItem.pQuantity}</td>
                                                                                <td>{OItem.pQuantity * OItem.PricePerItem}</td>
                                                                                <td> {OItem.pDiscountPercentage}</td>
                                                                                <td>{(((OItem.pQuantity * OItem.PricePerItem)) * OItem.pDiscountPercentage) / 100}</td>
                                                                                <td>{(OItem.pQuantity * OItem.PricePerItem) - (((OItem.pQuantity * OItem.PricePerItem)) * OItem.pDiscountPercentage) / 100}</td>
                                                                            </tr>
                                                                    )
                                                                }
                                                            </MDBTableBody>

                                                            <MDBTableHead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th>Total net Payment:</th>
                                                                    <th>{TotalPay}</th>
                                                                </tr>
                                                            </MDBTableHead>
                                                        </MDBTable>
                                                    </div>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBContainer>
                                </div>
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal >
            </div >
        </section>

    )
}

export default OrderList
