import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    token: null,
    user: null,
    expire: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTRATION:
            return {
                ...state,
                isAuth: true,
                token: action.token
            }

        case actionTypes.LOGIN:
            return {
                ...state,
                isAuth: true,
                token: action.token
            }

        case actionTypes.LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: null
            }

        case actionTypes.IS_AUTH:           

            return {
                ...state,
                isAuth: action.payload.isAuth ? true : false,
                token: action.payload.token,
                expire: action.payload.expiresIn
            }

        case actionTypes.GET_USER:
            return {
                ...state,
                user: action.user
            }
    
        default:
            return state
    }
}

export default authReducer;