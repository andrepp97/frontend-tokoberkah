import {
    LOGIN_SUCCESS,
    USER_LOGOUT
} from "../actions/types";

const INITIAL_STATE = {
    id: 0,
    username: '',
    email: '',
    status: '',
    token: '',
    authchecked: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...action.payload, authchecked:true}
        case USER_LOGOUT:
            return {...INITIAL_STATE, authchecked:true}
        default:
            return state
    }
}