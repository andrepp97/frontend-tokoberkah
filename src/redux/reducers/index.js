import { combineReducers } from "redux";
import RegisterReducer from './registerReducer'
import LoginReducer from "./loginReducer"
import UserReducer from "./UserReducer"

export default combineReducers({
    user: (state = 'Spiderman Mudik', action) => {
        if (action.name) {
            return action.name
        }

        return state
    },
    registerForm: RegisterReducer,
    loginForm: LoginReducer,
    userData: UserReducer
})