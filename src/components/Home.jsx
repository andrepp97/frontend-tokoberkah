import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { MDBBtn } from 'mdbreact'


class Home extends Component {
    render() {
        return (
            <div className='container py-5'>
                <h1 className='mt-5'>Mantap Jiwa</h1>

                <Link to='/manageToko'>
                    <MDBBtn>BUDHAL</MDBBtn>
                </Link>
            </div>
        );
    }
}

export default Home;