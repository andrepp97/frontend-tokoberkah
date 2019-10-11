import { 
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    ON_USER_LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS
 } from "../actions/types";


 const INITIAL_STATE = {
    id: 0,
    username: '',
    email: '',
    password: '',
    isLoading: false,
    error: ''
 }


 export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case LOGIN_PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case ON_USER_LOGIN :
            return { ...state, isLoading: true, error: '' }
        case LOGIN_FAILED :
            return { ...state, isLoading: false, error: action.payload }
        case LOGIN_SUCCESS :
            return INITIAL_STATE
        default:
            return state
    }
}