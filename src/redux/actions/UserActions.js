import {
    LOGIN_SUCCESS,
    USER_LOGOUT
} from "./types"
import axios from 'axios'
import { urlApi } from '../../helper/database'


export const confirmLogin = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const keepLogin = (token) => {
    return (dispatch) => {
        var options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.post(urlApi + 'user/keepLogin', null, options)
            .then(res => {
                res.data.authchecked = true
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                localStorage.removeItem('token')
                console.log(err.response.data)
                dispatch({
                    type: USER_LOGOUT
                })
            })
    }
}


export const userLogout = () => {
    localStorage.removeItem('token')
    return {
        type: USER_LOGOUT
    }
}
