import React, { Component } from "react"
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn
} from "mdbreact"
import { userLogout } from "../redux/actions"


class NavbarPage extends Component {
    state = {
        isOpen: false,
    }
    

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        if (!this.props.userData.authchecked) {
            return (
                <MDBNavbar color="indigo" dark expand="md" scrolling fixed='top'>
                    <MDBNavbarBrand className='ml-4'>
                        <Link to='/'>
                            <strong className="white-text">BERKAH STORE</strong>
                        </Link>
                    </MDBNavbarBrand>
                </MDBNavbar>
            )    
        }

        return (
            <MDBNavbar color="indigo" dark expand="md" scrolling fixed='top'>
                <MDBNavbarBrand className='ml-4'>
                    <Link to='/'>
                        <strong className="white-text">BERKAH STORE</strong>
                    </Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav className='mr-4' right>

                        {
                            this.props.userData.username === ''
                            ?
                            <>
                            <MDBNavItem>
                                <Link to='/register'>
                                    <MDBBtn color='elegant' className='rounded-pill py-2'>Register</MDBBtn>
                                </Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link to='/login'>
                                    <MDBBtn color='primary' className='rounded-pill py-2'>Login</MDBBtn>
                                </Link>
                            </MDBNavItem>
                            </>
                            :
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" style={{fontSize:'125%', marginTop:'4px'}} />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                        <div className='card p-3 mt-n2'>
                                            Hello, <b>{this.props.userData.username}</b>
                                        </div>
                                        <Link to="/manageToko">
                                            <MDBDropdownItem>
                                                <MDBIcon icon="store" /> MANAGE STORE
                                            </MDBDropdownItem>
                                        </Link>
                                        <MDBDropdownItem onClick={this.props.userLogout}>
                                            <MDBIcon icon="power-off" /> Logout
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        }

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        )    
    }
}


const mapStateToProps = ({ userData }) => {
    return { userData }
}

export default connect(mapStateToProps, { userLogout })(NavbarPage)