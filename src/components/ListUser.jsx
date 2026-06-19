import React, { Component } from 'react'
import { variables } from './Variables.jsx';
import BackendService from '../services/BackendService';
import ProBackendService from "../services/ProBackendService";
import {
    MDBContainer, MDBRow, MDBTable, MDBTableHead, MDBCard, MDBCardBody, MDBTableBody, MDBBtn, MDBModal, MDBIcon, MDBCol, MDBInput, MDBCheckbox,
    MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBCardImage, MDBCardText
} from 'mdb-react-ui-kit';

class ListUser extends Component {
    constructor(props) {
        super(props)

        // declare state variables
        this.state = {
            users: [],
            orders: [],
            orderItems: [],
            CurrentUser: { id: '', name: '', emailID: '', mobileNo: '', modifiedBy: '', subs_Newsletter: false, verified: false, active: false },
            id: '', name: '', emailID: '', mobileNo: '', modifiedBy: '', imageName: '',
            subs_Newsletter: false, verified: false, active: false,
            viewModal: false,
            editModal: false
        }
        // subscribe/register events
        this.viewUser = this.viewUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);

    }

    // page load function ********************************************************************
    componentDidMount() {


        BackendService.getAllUser().then((res) => {
            this.setState({ users: res.data });
            // console.log('user loaded:' + JSON.stringify(this.state.users))
        });

        ProBackendService.getAllOrder().then(res => {
            this.setState({ orders: res.data });
        });


        ProBackendService.getOrderStatus().then(res => {
            this.setState({ orderItems: res.data });
        });


    }
    // Delete user function **********************************************************************
    deleteUser(id) {
        if (window.confirm('Are you sure?')) {
            BackendService.deleteUser(id).then(res => {
                this.setState({ users: this.state.users.filter(users => users.id !== id) });
            });
            alert('User  with id ' + id + 'is deleted successfully')
        }
    }

    // to view user data in modal popup ****************************************************************
    viewUser(Objuser) {
        this.setState({
            id: Objuser.id,
            name: Objuser.name,
            emailID: Objuser.emailID,
            mobileNo: Objuser.mobileNo,
            imageName: Objuser.imageName,
            subs_Newsletter: Objuser.subs_Newsletter,
            verified: Objuser.verified,
            active: Objuser.active,
            modifiedBy: Objuser.modifiedBy,
        });

        this.setState({ viewModal: !this.state.viewModal });

    }
    veiw_toggleShow = () => this.setState({ viewModal: !this.state.viewModal });

    //********************************************************************************************************** */
    // to edit user data using modal popup **********************************************************************
    editUser(Objuser) {
        this.setState({
            id: Objuser.id,
            name: Objuser.name,
            emailID: Objuser.emailID,
            mobileNo: Objuser.mobileNo,
            subs_Newsletter: Objuser.subs_Newsletter,
            modifiedBy: ''
        })
        console.log('state object: ' + JSON.stringify(this.state.subs_Newsletter))
        console.log('Passed object: ' + JSON.stringify(Objuser.subs_Newsletter))
        this.setState({ editModal: !this.state.editModal });

    }

    edit_toggleShow = () => this.setState({ editModal: !this.state.editModal });


    // Handle the onChnage event and set user intput to state variable
    onChangeHandler = (e) => {
        console.log(e.target.id + ':' + e.target.value);
        switch (e.target.id) {
            case "name":
                this.setState({ name: e.target.value })
                console.log(this.state.name);
                break;
            case "emailID":
                this.setState({ emailID: e.target.value })
                console.log(this.state.emailID);
                break;
            case "mobileNo":
                this.setState({ mobileNo: e.target.value })
                console.log(this.state.mobileNo);
                break;
            case "subs_Newsletter":
                this.setState({ subs_Newsletter: e.target.checked.toString() });
                break;

        }
    }

    // Save the user update to database
    updateUser = (e) => {
        e.preventDefault();
        let data = {
            Id: this.state.id,
            Name: this.state.name,
            EmailID: this.state.emailID,
            MobileNo: this.state.mobileNo,
            Subs_Newsletter: this.state.subs_Newsletter,
            ModifiedBy: this.state.modifiedBy,
        };
        if (this.state.name.length < 5) {
            alert('Please enter your full name, having minimum 5 letters')
            return
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.emailID)) {
            alert('Please enter a valid email address')
            return
        }
        if (this.state.mobileNo.length != 10) {
            alert('Please enter valid mobile number of 10 digit')
            return
        }
        console.log('user data to be sent to server api:' + JSON.stringify(data));
        BackendService.EditUser(JSON.stringify(data)).then(res => {

            alert('Your update is successful');
            window.location.reload(true);

        });


    }

    // Java script end*********************************************************************************************************
    //*********************************************************************************************************************** */


    render() {

        return (<>
            <MDBContainer >
                <MDBRow className="justify-content-center my-2">
                    <MDBCard className='w-100'>
                        <MDBCardBody>
                            <MDBRow>
                                <caption> List of users </caption>
                                <div class="table-responsive">
                                    <MDBTable align='middle' class="table table-sm">
                                        <MDBTableHead>
                                            <tr>
                                                <th> User ID</th>
                                                <th> User Name</th>
                                                <th> User Mobile Number</th>
                                                <th> User Email Address</th>
                                                <th> Verified</th>
                                                <th> Status</th>
                                                <th> Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {
                                                this.state.users.map(
                                                    users =>
                                                        <tr key={users.id} >
                                                            <td> {users.id} </td>
                                                            <td> {users.name} </td>
                                                            <td> {users.mobileNo}</td>
                                                            <td> {users.emailID}</td>
                                                            <td> {users.verified.toString() === 'true' ? 'Yes' : 'No'}</td>
                                                            <td> {users.active.toString() === 'true' ? 'Active' : 'Inactive'}</td>
                                                            <td>

                                                                <MDBBtn color='link' rounded size='sm' onClick={() => this.viewUser(users)}  >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                    </svg>
                                                                </MDBBtn>
                                                                <MDBBtn color='link' rounded size='sm' onClick={() => this.editUser(users)}  >
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
                    <MDBModal staticBackdrop show={this.state.viewModal} setShow={this.state.viewModal} tabIndex='-1' >
                        <MDBModalDialog size='xl' >
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>User Information</MDBModalTitle>
                                    <MDBBtn className='btn-close' color='none' onClick={this.veiw_toggleShow}></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <MDBContainer className="py-0">
                                        <MDBRow>
                                            <MDBCol lg="4">
                                                <MDBCard className="mb-4">
                                                    <MDBCardBody className="text-center">
                                                        <MDBCardImage
                                                            src={variables.PHOTO_URL + this.state.imageName}
                                                            alt="avatar"
                                                            className="rounded-circle"
                                                            style={{ width: '150px' }}
                                                            fluid />
                                                        <p className="text-muted mb-1">{this.state.id}</p>
                                                        <p className="text-muted mb-4">{this.state.name}</p>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                            <MDBCol lg="8">
                                                <MDBCard className="mb-4">
                                                    <MDBCardBody>
                                                        <MDBRow>
                                                            <MDBCol sm="3">
                                                                <MDBCardText>Email</MDBCardText>
                                                            </MDBCol>
                                                            <MDBCol sm="9">
                                                                <MDBCardText className="text-muted">{this.state.emailID}</MDBCardText>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <hr />
                                                        <MDBRow>
                                                            <MDBCol sm="3">
                                                                <MDBCardText>Mobile</MDBCardText>
                                                            </MDBCol>
                                                            <MDBCol sm="9">
                                                                <MDBCardText className="text-muted">{this.state.mobileNo}</MDBCardText>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <hr />
                                                        <MDBRow>
                                                            <MDBCol sm="3">
                                                                <MDBCardText>Verified</MDBCardText>
                                                            </MDBCol>
                                                            <MDBCol sm="9">
                                                                <MDBCardText className="text-muted">{this.state.verified ? 'Yes' : 'No'}</MDBCardText>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <hr />
                                                        <MDBRow>
                                                            <MDBCol sm="3">
                                                                <MDBCardText>News letter subscribed</MDBCardText>
                                                            </MDBCol>
                                                            <MDBCol sm="9">
                                                                <MDBCardText className="text-muted">{this.state.subs_Newsletter ? 'Yes' : 'No'}</MDBCardText>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <hr />
                                                        <MDBRow>
                                                            <MDBCol sm="3">
                                                                <MDBCardText>Status</MDBCardText>
                                                            </MDBCol>
                                                            <MDBCol sm="9">
                                                                <MDBCardText className="text-muted">{this.state.active ? 'Active' : 'Inactive'}</MDBCardText>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <caption> List of orders</caption>
                                            <MDBCol>
                                                <MDBCard className="mb-4">
                                                    <MDBCardBody>
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
                                                                    <th >Order Date </th>
                                                                    <th >Ex. Del. Date </th>
                                                                    <th >Customer Name </th>
                                                                    <th >Action </th>
                                                                </tr>
                                                            </MDBTableHead>
                                                            <MDBTableBody>
                                                                {
                                                                    this.state.orders.map(item =>
                                                                        item.uID === this.state.id ?
                                                                            <tr key={item.orderId} >
                                                                                <td> {item.orderId} </td>
                                                                                <td> {item.orderValue} </td>
                                                                                <td> {item.discountValue}</td>
                                                                                <td> {item.netPaidValue}</td>
                                                                                <td>{item.statusName}</td>
                                                                                <td> {item.paymentStatus.toString() === 'true' ? 'Done' : 'Pending'}</td>
                                                                                <td> {item.orderDate.substring(0, 10)} </td>
                                                                                <td> {item.expectedDeliveryDate.substring(0, 10)} </td>
                                                                                <td> {item.uName} </td>
                                                                            </tr>
                                                                            : ''
                                                                    )
                                                                }
                                                            </MDBTableBody>
                                                        </MDBTable>
                                                        </div>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </MDBModalBody>

                                <MDBModalFooter class="text-danger text-center ">
                                    For any data discrepancy, please click on EDIT icon and update the correct & latest details
                                </MDBModalFooter>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </MDBRow>
            </MDBContainer>
            <div>
                <MDBModal staticBackdrop show={this.state.editModal} setShow={this.state.editModal} tabIndex='-1'>
                    <MDBModalDialog >
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>User Details</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={this.edit_toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <form className="mx-3 grey-text">
                                    <div className="d-flex flex-row align-items-center mb-3">
                                        <MDBIcon fas icon="user me-3" size='lg' />
                                        <MDBInput label='Your full name' id='name' type='text' validate error="wrong" success="right" value={this.state.name} onChange={this.onChangeHandler} />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-3">
                                        <MDBIcon fas icon="envelope me-3" size='lg' />
                                        <MDBInput label='Your Email Address' id='emailID' type='email' validate error="wrong" success="right" value={this.state.emailID} onChange={this.onChangeHandler} />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-3">
                                        <MDBIcon fas icon="phone me-3" size='lg' />
                                        <MDBInput label='Your Mobile Number' id='mobileNo' type='Number' validate error="wrong" success="right" value={this.state.mobileNo} onChange={this.onChangeHandler} />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MDBCheckbox id='subs_Newsletter' label='Subscribe to our newsletter' checked={this.state.subs_Newsletter} onChange={() => this.setState({ subs_Newsletter: !this.state.subs_Newsletter })} />
                                    </div>

                                    <MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={this.updateUser}>Update</MDBBtn>
                                </form>
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal >
            </div >

        </>
        )
    }
} export default ListUser