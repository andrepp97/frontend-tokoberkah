import { urlApi } from '../../helper/database'
import axios from 'axios'
import {
    REGISTER_USERNAME_CHANGED,
    REGISTER_EMAIL_CHANGED,
    REGISTER_CONFIRMEMAIL_CHANGED,
    REGISTER_PASSWORD_CHANGED,
    REGISTER_CONFIRMPASSWORD_CHANGED,
    ON_USER_REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from './types'


// FORM CHANGING //
export const inputRegisterUsername = (username) => {
    return {
        type: REGISTER_USERNAME_CHANGED,
        payload: username
    }
}

export const inputRegisterEmail = (email) => {
    return {
        type: REGISTER_EMAIL_CHANGED,
        payload: email
    }
}

export const inputRegisterConfirmEmail = (email) => {
    return {
        type: REGISTER_CONFIRMEMAIL_CHANGED,
        payload: email
    }
}

export const inputRegisterPassword = (password) => {
    return {
        type: REGISTER_PASSWORD_CHANGED,
        payload: password
    }
}

export const inputRegisterConfirmPassword = (password) => {
    return {
        type: REGISTER_CONFIRMPASSWORD_CHANGED,
        payload: password
    }
}
// FORM CHANGING //


// USER REGISTER //
export const userRegister = (user) => {
    return (dispatch) => {
        dispatch({
            type: ON_USER_REGISTER
        })

        if (user.email !== ''
            && user.password !== ''
            && user.username !== ''
            && user.confirmEmail !== ''
            && user.confirmPassword !== '') {
                if (user.email === user.confirmEmail) {
                    if (user.password === user.confirmPassword) {
                        axios.post(urlApi + 'user/register', {
                            email: user.email,
                            password: user.password,
                            username: user.username
                        }).then(res => {
                                dispatch({
                                    type: REGISTER_SUCCESS,
                                    payload: user.email
                                })
                            })
                            .catch(err => {
                                console.log(err.response)
                                if (err.response.data.error) {
                                    dispatch({
                                        type: REGISTER_FAILED,
                                        payload: err.response.data.message
                                    })   
                                } else if (!err.response.data.error) {
                                    dispatch({
                                        type: REGISTER_SUCCESS,
                                        payload: user.email
                                    })
                                }
                            })
                    } else {
                        dispatch({
                            type: REGISTER_FAILED,
                            payload: 'Password dan Confirm Password Harus Sama!'
                        })
                    }
                } else {
                    dispatch({
                        type: REGISTER_FAILED,
                        payload: 'Email dan Confirm Email Harus Sama!'
                    })
                }
        } else {
            dispatch({
                type: REGISTER_FAILED,
                payload: 'Make sure Username, Email and Password are not blank!'
            })
        }
    }
}
// USER REGISTER //