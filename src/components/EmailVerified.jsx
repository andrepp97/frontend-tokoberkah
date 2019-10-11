import React, { Component } from 'react';
import axios from 'axios'
import { urlApi } from '../helper/database'
import queryString from 'query-string'


class EmailVerified extends Component {
    state = {
        loading: true,
        message: ''
    }

    componentDidMount() {
        var params = queryString.parse(this.props.location.search)

        axios.post(urlApi + 'user/emailConfirmed', {
            email: params.email
        }).then(res => {
            this.setState({ message: 'Email Berhasil di Confirm' })
            localStorage.setItem('token', res.data.token)
            this.props.confirmLogin(res.data)
        }).catch(err => {
            this.setState({ message: 'Email Gagal di Confirm' })
        })
    }
    

    render() {
        if (this.state.loading) {
            return (
                <div className='container pt-5 text-center'>
                    <h1 className='mt-5'>Verifying Your Email, Please Wait</h1>
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
                </div>
            )
        }

        return (
            <div className="container pt-5 text-center">
                <h1 className='mt-5'>{this.state.message}</h1>
            </div>
        )
    }
}

export default EmailVerified