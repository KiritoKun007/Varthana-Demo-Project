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