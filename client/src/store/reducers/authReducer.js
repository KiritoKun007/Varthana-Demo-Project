import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    token: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTRATION:
            return {
                ...state,
                isAuth: true,
                token: action.token
            }
    
        default:
            return state
    }
}

export default authReducer;