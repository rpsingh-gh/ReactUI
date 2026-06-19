import React, { useState, useEffect } from 'react'
import ProBackendService from '../services/ProBackendService';
import { variables } from './Variables.jsx';
import { useNavigate } from 'react-router-dom';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import {
    MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBModal, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBCol, MDBIcon, MDBTooltip,
    MDBModalBody, MDBModalTitle, MDBModalHeader, MDBModalDialog, MDBModalContent, MDBInput, MDBRipple, MDBTypography, MDBCardText
} from 'mdb-react-ui-kit';


function ProductsList() {

    const navigate = useNavigate();
    const [InitialState, setInitialState] = useState({
        pID: 0,
        pName: "",
        pType: "",
        pDestcription: "",
        noOfItemsAvailable: "",
        maxItemPerOder: "",
        pricePerItem: "",
        pImageName: "dummy.jpg",
        pStatus: "",
        pDiscount: "",
        pDiscountDescription: "",
        ModifiedBy: "",
    });

    const [PhotoFileName, setPhotoFileName] = useState('dummy.jpg');
    const [Products, setProducts] = useState([])
    const [Product, setProduct] = useState(InitialState)
    const [editModal, seteditModal] = useState(false)
    const [btn, setbtn] = useState("")


    useEffect(() => {
        const getData = async () => {

            ProBackendService.GetAllProduct().then(res => {
                setProducts(res.data);
            });
        }

        getData();
        console.log(JSON.stringify(Products));
    }, []);

    function editProduct(ObjProduct) {
        setbtn("Update Product")
        setProduct(ObjProduct);
        console.log('Object in Product to be updated:' + JSON.stringify(ObjProduct))
        seteditModal(!editModal);
    }
    function addProduct() {
        setbtn("Create Product")
        setProduct(InitialState);
        seteditModal(!editModal);
    }

    function edit_toggleShow() { seteditModal(!editModal); }

    const imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + '/Product/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setPhotoFileName(data);
                setProduct((Product) => ({ ...Product, pImageName: data }));
            })
    }


    const handleChange = (event) => {
        const { id, value } = event.target;
        setProduct((Product) => ({ ...Product, [id]: value }));
        console.log('On chnage event:' + JSON.stringify(event.target.value))

    };
    const ProductSubmit = (event) => {
        event.preventDefault();

        let ObjProduct = {
            pID: Product.pID,
            pName: Product.pName,
            pType: Product.pType,
            pDestcription: Product.pDestcription,
            noOfItemsAvailable: Product.noOfItemsAvailable,
            maxItemPerOder: Product.maxItemPerOder,
            pricePerItem: Product.pricePerItem,
            pImageName: Product.pImageName,
            pStatus: Product.pStatus,
            pActive: Product.pActive,
            ModifiedBy: read_cookie('userId').toString(),
            pDiscount: Product.pDiscount,
            pDiscountDescription: Product.pDiscountDescription

        }

        console.log('server object: ' + JSON.stringify(ObjProduct))

        if (ObjProduct.pName.length < 3) {
            alert('please enter prodcut name')
            return
        }
        if (ObjProduct.pType.length < 3) {
            alert('please enter prodcut Type ')
            return
        }
        if (ObjProduct.pDestcription.length < 3) {
            alert('please enter prodcut discription')
            return
        }

        ProBackendService.ProductSubmit(JSON.stringify(ObjProduct)).then(res => {
            console.log('server response: ' + JSON.stringify(res.data))
            navigate('/ProductsList');
            seteditModal(!editModal);
           
        });
    }

    return (
        <section>

            <MDBContainer>
                <MDBRow className="justify-content-center my-2">
                    <MDBCard className='w-100'>
                        <MDBCardBody>
                            <MDBRow>
                                <caption> List of Products </caption>
                                <MDBBtn className="d-flex justify-content-end" color='link' rounded size='sm' onClick={addProduct} >
                                    <div style={{ maxWidth: "300px", height: "45px" }} >
                                        <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-4 mb-5"
                                            title="Add New Product">
                                            <MDBIcon fas icon="plus" />
                                        </MDBTooltip>
                                    </div>
                                </MDBBtn>
                                <div class="table-responsive">
                                    <MDBTable align='middle' class="table table-sm">
                                        <MDBTableHead>
                                            <tr>
                                                <th>ProductID </th>
                                                <th>ProductName </th>
                                                <th>ProductType</th>
                                                <th>PricePerItem</th>
                                                <th> Items Status</th>
                                                <th>PDiscount</th>
                                                <th>Pro. Status</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {
                                                Products.map(
                                                    item =>
                                                        <tr key={item.pID} >
                                                            <td> {item.pID} </td>
                                                            <td> {item.pName} </td>
                                                            <td> {item.pType} </td>
                                                            <td> {item.pricePerItem}</td>
                                                            <td> {item.pStatus} </td>
                                                            <td> {item.pDiscount} </td>
                                                            <td> {item.pActive.toString() === 'true' ? 'Active' : 'Inactive'}</td>
                                                            <td>
                                                                <MDBBtn color='link' rounded size='sm' onClick={() => editProduct(item)} >
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

                    <MDBModal staticBackdrop show={editModal} setShow={editModal} tabIndex='-1' >
                        <MDBModalDialog size='xl' >
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>Product Information</MDBModalTitle>
                                    <MDBBtn className='btn-close' color='none' onClick={edit_toggleShow}> </MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <MDBRow>
                                        <div className="d-flex flex-row align-items-center mb-3">

                                            <MDBContainer className="py-1">
                                                <MDBRow>
                                                    <MDBCol lg="4">
                                                        <MDBCard className="mb-4">
                                                            <MDBCardBody className="text-center">
                                                                <MDBRipple rippleTag="a" href="#!" className="bg-image rounded hover-zoom hover-overlay" >
                                                                    <img className='img-fluid shadow-4'
                                                                        src={variables.PHOTO_URL + Product.pImageName} />
                                                                </MDBRipple>
                                                                <input className="m-2" type="file" onChange={imageUpload} />
                                                            </MDBCardBody>
                                                        </MDBCard>
                                                    </MDBCol>
                                                    <MDBCol lg="8">
                                                        <MDBCard className="mb-4">
                                                            <MDBCardBody>
                                                                <MDBTypography tag="h5" className="mb-0">
                                                                    <MDBCardText className="text-muted"> <strong> Product Information: </strong> </MDBCardText>
                                                                </MDBTypography>
                                                                <MDBRow>
                                                                    <MDBCol md='15' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-left'>
                                                                        <div className="d-flex flex-row align-items-center mb-3">
                                                                            <MDBInput label='Product Name' id='pName' type='text' value={Product.pName} onChange={handleChange} />
                                                                        </div>
                                                                        <div className="d-flex flex-row align-items-center mb-3">
                                                                            <MDBInput label='Product Type ' id='pType' type='text Type' value={Product.pType} onChange={handleChange} />
                                                                        </div>
                                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                                            <MDBInput label='Price Per Item' id='pricePerItem' type='number' value={Product.pricePerItem} onChange={handleChange} />
                                                                        </div>

                                                                    </MDBCol>

                                                                    <MDBCol md='15' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-left'>
                                                                        <div className="d-flex flex-row align-items-center mb-3">
                                                                            <MDBInput label='No of Items Available' id='noOfItemsAvailable' type='number' value={Product.noOfItemsAvailable} onChange={handleChange} />
                                                                        </div>
                                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                                            <MDBInput label='Maximum Items Per Order' id='maxItemPerOder' type='number' value={Product.maxItemPerOder} onChange={handleChange} />
                                                                        </div>
                                                                    </MDBCol>
                                                                </MDBRow>

                                                                <MDBRow>
                                                                    <div className="h-25 d-inline-block" style={{ hight: 200 }}>
                                                                        <MDBInput wrapperClass='mb-4' id='pDestcription' rows={4} label='Product Description' value={Product.pDestcription} onChange={handleChange} />
                                                                    </div>
                                                                </MDBRow>
                                                                <MDBRow><MDBCol><hr className="my-4" /></MDBCol></MDBRow>
                                                                <MDBTypography tag="h7" className="mb-0">
                                                                    <MDBCardText className="text-muted"> <strong> Product Discount Information: </strong> </MDBCardText>
                                                                </MDBTypography>

                                                                <MDBRow>
                                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                                        <MDBInput label='Product Discount %' id='pDiscount' type='number' value={Product.pDiscount} onChange={handleChange} />
                                                                    </div>
                                                                    <div className="h-25 d-inline-block" style={{ hight: 200 }}>
                                                                        <MDBInput wrapperClass='mb-4' id='pDiscountDescription' rows={4} label='Product Discount Description' value={Product.pDiscountDescription} onChange={handleChange} />
                                                                    </div>
                                                                </MDBRow>
                                                                <MDBRow><MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={ProductSubmit} >{btn}</MDBBtn></MDBRow>
                                                            </MDBCardBody>
                                                        </MDBCard>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBContainer>
                                        </div>
                                    </MDBRow>
                                </MDBModalBody>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </MDBRow>
            </MDBContainer>
        </section>

    )
}

export default ProductsList
