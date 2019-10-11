import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios'
import { urlApi } from '../helper/database'


class EmailVerify extends Component {

    btnResendEmail = () => {
        var params = queryString.parse(this.props.location.search)
        console.log(params)

        axios.post(urlApi + 'user/resendEmailConfirm', {
            email: params.email
        }).then(res => {
            alert(res.data.message)
        }).catch(err => {
            console.log(err.response)
            alert(err.response.data.message)
        })
    }


    render() {
        return (
            <div className='container py-5 text-center'>
                <h1 className='mt-5'>Please Check Your Email To Confirm</h1>
                <h4>
                    If you didn't receive an email, 
                    <input type="button" value="Click Here" className='btn btn-primary' onClick={this.btnResendEmail} />
                </h4>
            </div>
        )
    }
}

export default EmailVerify