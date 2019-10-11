import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import {
    inputLoginEmail, inputLoginPassword, loginUser
} from '../redux/actions'


class Login extends Component {

    onBtnLoginClick = () => {
        this.props.loginUser(this.props.loginForm)
    }


    render() {
        if (this.props.userData.username !== '') {
            return <Redirect to='/' />
        }

        const{ email, password, isLoading, error } = this.props.loginForm

        return (
            <MDBContainer className='py-5'>
                <div className="card my-5 p-5 col-lg-6 offset-lg-3">
                    <MDBRow>
                        <MDBCol className='col-md-12'>
                            <form>
                                <h4 className="text-center mb-4">LOGIN</h4>
                                <div className="grey-text">
                                    <MDBInput
                                        label="Your email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        value={email}
                                        onChange={(e) => this.props.inputLoginEmail(e.target.value)}
                                    />
                                    <MDBInput
                                        label="Your password"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                        value={password}
                                        onChange={(e) => this.props.inputLoginPassword(e.target.value)}
                                    />
                                </div>
                                <div className="text-center">
                                    <p className='text-danger mb-3'>{error}</p>
                                    {
                                        isLoading
                                        ?
                                        <div className='d-flex justify-content-center my-4'>
                                            <div className="spinner-grow text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <div className="spinner-grow text-success mx-2" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <div className="spinner-grow text-info" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        <MDBBtn
                                        color="indigo"
                                        className='px-5 rounded-pill font-weight-bold'
                                        style={{ letterSpacing: '2px' }}
                                        onClick={this.onBtnLoginClick}
                                        >
                                        Login
                                        </MDBBtn>
                                    }
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </div>
            </MDBContainer>
        )
    }
}

const mapStateToProps = ({ loginForm, userData }) => {
    return { loginForm, userData }
}

export default connect(mapStateToProps, { inputLoginEmail, inputLoginPassword, loginUser })(Login)