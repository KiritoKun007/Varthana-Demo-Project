import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    token: null,
    user: null,
    expire: null,
    msg: '',
    successMsg: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTRATION:
            return {
                ...state,
                isAuth: true,
                token: action.token
            }

        case actionTypes.REGISTRATION_FAIL:
            return {
                ...state,
                msg: action.msg
            }

        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                msg: action.msg
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
                token: null,
                user: null,
                expire: null
            }

        case actionTypes.IS_AUTH:           

            return {
                ...state,
                isAuth: action.payload.isAuth ? true : false,
                token: action.payload.token,
                expire: action.payload.expiresIn,
                user: action.payload.user
            }

        case actionTypes.GET_USER:
            return {
                ...state,
                user: action.user
            }

        case actionTypes.EDIT_USER:
            return {
                ...state,
                user: action.user,
                successMsg: action.msg
            }
    
        default:
            return state
    }
}

export default authReducer;