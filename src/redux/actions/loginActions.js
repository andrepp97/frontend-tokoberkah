import axios from 'axios'
import { urlApi } from '../../helper/database'
import {
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    ON_USER_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from './types'


export const inputLoginEmail = (email) => {
    return {
        type: LOGIN_EMAIL_CHANGED,
        payload: email
    }
}

export const inputLoginPassword = (password) => {
    return {
        type: LOGIN_PASSWORD_CHANGED,
        payload: password
    }
}


export const loginUser = (user) => {
    return (dispatch) => {
        dispatch({ type: ON_USER_LOGIN })
        if(user.email !== '' && user.password !== '') {
            axios.post(urlApi + 'user/login', {
                email: user.email,
                password: user.password
            }).then(res => {
                localStorage.setItem('token', res.data.token)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            }).catch(err => {
                console.log(err.response)
                dispatch({
                    type: LOGIN_FAILED,
                    payload: err.response.data.message
                })
            })
        } else {
            dispatch({
                type: LOGIN_FAILED,
                payload: 'Mohon isi Username dan Password'
            })
        }
    }
}