import { combineReducers } from "redux";

export default combineReducers({
    user: (state = 'Spiderman Mudik', action) => {
        if (action.name) {
            return action.name
        }

        return state
    }
})