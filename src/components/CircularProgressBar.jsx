import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import {
    MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBCol
} from 'mdb-react-ui-kit';

function CircularProgressBar() {
    const [percentage, setPercentage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const goToHomePage = () => navigate('#/');
        setTimeout(() => {
            if (percentage < 100) {
                setPercentage(percentage + 1);
            }
            else  { goToHomePage() }
        }, 500);
    }, [percentage]);

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <MDBContainer>
                    <MDBRow className="justify-content-center my-2">
                        <MDBCard className='w-100'>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                                        <h4>Please wait, environment is getting ready.</h4>
                                        <div style={{ width: 150 }}>
                                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                                        </div>

                                    </MDBCol>
                                </MDBRow> 
                                <MDBRow>
                                   <br></br>
                                </MDBRow>
                                <MDBRow>
                                    {percentage === 100 ?
                                    <div>
                                        <p><strong> Application is now up & running</strong></p>
                                        <br/>
                                        <p>Please click<a href='/'> <strong> here </strong></a>to go to home page</p>
                                        <br/>
                                        <br/>
                                        <p>In case, above link doesn't work, please do refresh the page!</p>
                                        <br/>
                                        </div>
                                        : ''
                                    }
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBRow>
                </MDBContainer>
            </div>
        </>
    );
}
export default CircularProgressBar;