import * as actionTypes from "./actionTypes"; 

export const registerForm = (inputs) => {
    return async dispatch => {
        try {
            const body = { ...inputs }

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const resData = await response.json()

            localStorage.setItem("token", resData.token)

            dispatch({
                type: actionTypes.REGISTRATION,
                token: resData.token
            })

        } catch (err) {
            console.error(err.message)
        }
    }
}

export const loginForm = (inputs) => {
    return async dispatch => {
        try {
            const body = { ...inputs }

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const resData = await response.json()

            localStorage.setItem("token", resData.token)

            dispatch({
                type: actionTypes.LOGIN,
                token: resData.token
            })

        } catch (err) {
            console.error(err.message)
        }
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem("token")

        dispatch({
            type: actionTypes.LOGOUT
        })
    }
}

export const verifyAuth = () => {
    return async dispatch => {
        try {

            if(localStorage.token) {
                const response = await fetch("http://localhost:5000/auth/verify", {
                  method: "GET",
                  headers: {
                    token: localStorage.token
                  }
                })      
          
                const resData = await response.json();

                dispatch({
                    type: actionTypes.IS_AUTH,
                    payload: {
                        isAuth: resData,
                        token: localStorage.token
                    }
                });
            }        
            
        } catch (err) {
            console.error(err.message)
        }
    }
}