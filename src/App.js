import React, { Component } from 'react'
import { Route } from "react-router-dom"
import { connect } from "react-redux"

// COMPONENTS
import Navbar from './components/Navbar'
import Home from "./components/Home"
import ManageToko from './components/ManageToko'
import Register from './components/Register'
import Login from './components/Login'
import EmailVerify from './components/EmailVerify'
import EmailVerified from './components/EmailVerified'

import {keepLogin} from './redux/actions'
// COMPONENTS


class App extends Component {

  componentDidMount() {
    var token = localStorage.getItem('token')
    console.log(token)
    this.props.keepLogin(token)
  }
  

  render() {
    return (
      <div>
        <Navbar />
        <Route component={Home} path='/' exact />
        <Route component={ManageToko} path='/manageToko' exact />
        <Route component={Register} path='/register' exact />
        <Route component={Login} path='/login' exact />
        <Route component={EmailVerify} path='/emailverification' exact />
        <Route component={EmailVerified} path='/emailverified' exact />
      </div>
    )
  }
}

export default connect(null, {keepLogin})(App)