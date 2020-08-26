import * as actionTypes from "./actionTypes"; 
import { BASE_URL } from "../../constants/constants";

export const registerForm = (inputs) => {
    return async dispatch => {
        try {
            const body = { ...inputs }

            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(body)
            });

            const resData = await response.json()

            console.log(resData)

            if (!resData.status) {
                localStorage.setItem("token", resData.token)
    
                dispatch({
                    type: actionTypes.REGISTRATION,
                    token: resData.token
                })
            } else {

                dispatch({
                    type: actionTypes.REGISTRATION_FAIL,
                    msg: resData.msg
                })
            }

        } catch (err) {
            console.error(err)

            dispatch({
                type: actionTypes.REGISTRATION_FAIL,
                msg: err
            })
        }
    }
}

export const loginForm = (inputs) => {
    return async dispatch => {
        try {
            const body = { ...inputs }

            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(body)
            });

            const resData = await response.json()

            if (!resData.status) {
                localStorage.setItem("token", resData.token)
    
                dispatch({
                    type: actionTypes.LOGIN,
                    token: resData.token
                })
            } else {

                dispatch({
                    type: actionTypes.LOGIN_FAIL,
                    msg: resData.msg
                })
            }

        } catch (err) {
            console.error(err)
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                msg: err
            })
        }
    }
}

export const logout = () => {
    localStorage.removeItem("token")

    return {
        type: actionTypes.LOGOUT
    }
}

export const meFromToken = async (tokenFromStorage) => {
    const request = await fetch(`${BASE_URL}/auth/user/from/token`, {
        method: "GET",
        token: {
            token: tokenFromStorage
        }
    });

    const reqData = await request.json();

    return {
        type: actionTypes.ME_FROM_TOKEN,
        payload: reqData
    }
}

export const verifyAuth = () => {

    return async dispatch => {
        try {

            if(localStorage.token) {
                const response = await fetch(`${BASE_URL}/auth/verify`, {
                  method: "GET",
                  headers: {
                    token: localStorage.token
                  }
                })      
          
                const resData = await response.json();

                dispatch({
                    type: actionTypes.IS_AUTH,
                    payload: {
                        isAuth: resData.isAuth,
                        token: localStorage.token,
                        expiresIn: resData.expiryTime,
                        user: resData.user
                    }
                });
            }        
            
        } catch (err) {
            console.error(err.message)
        }
    }
}