import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import {
    inputRegisterEmail, inputRegisterUsername, inputRegisterConfirmEmail, inputRegisterPassword, inputRegisterConfirmPassword
} from '../redux/actions'
import {userRegister} from '../redux/actions'


class Register extends Component {

    onBtnRegister = () => {
        this.props.userRegister(this.props.registerForm)
        console.log(this.props.registerForm.username)
    }

    render() {
        if (this.props.userData.username !== '') {
            return <Redirect to='/' />
        }

        if (!this.props.registerForm.success) {
            const {
            username,
            email,
            confirmEmail,
            password,
            confirmPassword,
            isLoading,
            error
        } = this.props.registerForm

        return (
            <MDBContainer className='py-5'>
                <div className="card my-5 p-5 col-lg-6 offset-lg-3">
                <MDBRow>
                    <MDBCol className='col-md-12'>
                        <form>
                            <h4 className="text-center mb-4">REGISTER</h4>
                            <div className="grey-text">
                                <MDBInput
                                    label="Username"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    value={username}
                                    onChange={(e) => this.props.inputRegisterUsername(e.target.value)}
                                />
                                <MDBInput
                                    label="Your email"
                                    icon="envelope"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    value={email}
                                    onChange={(e) => this.props.inputRegisterEmail(e.target.value)}
                                />
                                <MDBInput
                                    label="Confirm your email"
                                    icon="exclamation-triangle"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    value={confirmEmail}
                                    onChange={(e) => this.props.inputRegisterConfirmEmail(e.target.value)}
                                />
                                <MDBInput
                                    label="Your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    value={password}
                                    onChange={(e) => this.props.inputRegisterPassword(e.target.value)}
                                />
                                <MDBInput
                                    label="Confirm your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    value={confirmPassword}
                                    onChange={(e) => this.props.inputRegisterConfirmPassword(e.target.value)}
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
                                    <MDBBtn color="indigo"
                                            className='px-5 rounded-pill font-weight-bold'
                                            style={{letterSpacing:'2px'}}
                                            onClick={this.onBtnRegister}>
                                        Register
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

        return <Redirect to={`/emailverification?email=${this.props.registerForm.emailSuccess}`} />
    }
}

const mapStateToProps = ({ registerForm, userData }) => {
    return { registerForm, userData }
}

export default connect(mapStateToProps, { userRegister, inputRegisterEmail, inputRegisterUsername, inputRegisterConfirmEmail, inputRegisterPassword, inputRegisterConfirmPassword })(Register)