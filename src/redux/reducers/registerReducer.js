import {
    REGISTER_USERNAME_CHANGED,
    REGISTER_EMAIL_CHANGED,
    REGISTER_CONFIRMEMAIL_CHANGED,
    REGISTER_PASSWORD_CHANGED,
    REGISTER_CONFIRMPASSWORD_CHANGED,
    ON_USER_REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from '../actions/types'


const INITIAL_STATE = {
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    success: false,
    emailSuccess: '',
    isLoading: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_USERNAME_CHANGED:
            return { ...state, username: action.payload }
        case REGISTER_EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case REGISTER_CONFIRMEMAIL_CHANGED:
            return { ...state, confirmEmail: action.payload }
        case REGISTER_PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case REGISTER_CONFIRMPASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload }
        case ON_USER_REGISTER:
            return { ...state, isLoading: true, error: '' }
        case REGISTER_FAILED:
            return { ...state, isLoading: false, error: action.payload }
        case REGISTER_SUCCESS:
            return { ...INITIAL_STATE, success: true, emailSuccess: action.payload }
        default:
            return state
    }
}