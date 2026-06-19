
import React from 'react'
import { useState } from 'react';
import ProBackendService from '../services/ProBackendService';
import { variables } from './Variables.jsx';


import {
    MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCol,  MDBBtn, MDBCardText, MDBRipple, MDBInput, MDBTypography
} from 'mdb-react-ui-kit';


function CreateProduct() {

    const [PhotoFileName, setPhotoFileName] = useState('dummy.jpg');
    const [Product, setProduct] = useState({
        pName: "",
        pType: "",
        pDestcription: "",
        NoOfItemsAvailable: "",
        MaxItemPerOder: "",
        PricePerItem: "",
        pImageName: "",
        pActive: "",
        pStatus:"",
        pDiscount: "",
        pDiscountDescription: "",
        ModifiedBy:"",
    });

    const  imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + 'Product/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setPhotoFileName(data);
            })
    }

    
    const handleChange = (event) => {
        const { id, value } = event.target;
        setProduct((Product) => ({ ...Product, [id]: value }));

    };
    const ProductSubmit = (event) => {
        event.preventDefault();

        let ObjProduct ={

            pID:0 ,
            pName: Product.pName,
            pType: Product.pType,
            pDestcription:Product.pDestcription,
            noOfItemsAvailable:Product.NoOfItemsAvailable,
            maxItemPerOder:Product.MaxItemPerOder,
            pricePerItem:Product.PricePerItem,
            pImageName:PhotoFileName,
            pStatus:Product.pStatus,
            ModifiedBy:Product.ModifiedBy,
            pDiscount:Product.pDiscount,
            pDiscountDescription:Product.pDiscountDescription

        }

        console.log('server object: '+JSON.stringify(ObjProduct))

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
            console.log('server response: '+JSON.stringify(res.data))


        });

        
    }
    return (
        <div className="vh-100">
            <MDBContainer className="py-1">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBRipple rippleTag="a" href="#!" className="bg-image rounded hover-zoom hover-overlay" >
                                    <img className='img-fluid shadow-4'
                                        src={variables.PHOTO_URL + PhotoFileName}/>
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
                                            <MDBInput label='Price Per Item' id='PricePerItem' type='number' value={Product.PricePerItem} onChange={handleChange} />
                                        </div>

                                    </MDBCol>

                                    <MDBCol md='15' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-left'>
                                        <div className="d-flex flex-row align-items-center mb-3">
                                            <MDBInput label='No of Items Available' id='NoOfItemsAvailable' type='number' value={Product.NoOfItemsAvailable} onChange={handleChange} />
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <MDBInput label='Maximum Items Per Order' id='MaxItemPerOder' type='number' value={Product.maxItemPerOder} onChange={handleChange} />
                                        </div>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <div className="h-25 d-inline-block" style={{ hight: 200 }}>
                                        <MDBInput wrapperClass='mb-4' id='pDestcription' rows={4} label='Product Description' onChange={handleChange} />
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
                                        <MDBInput wrapperClass='mb-4' id='pDiscountDescription' rows={4} label='Product Discount Description' onChange={handleChange} />
                                    </div>
                                </MDBRow>
                                <MDBRow><MDBBtn className='btn btn-primary btn-block mb-4' size='md' onClick={ProductSubmit} >Create Product</MDBBtn></MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default CreateProduct
