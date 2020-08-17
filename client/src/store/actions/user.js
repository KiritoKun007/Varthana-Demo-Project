import * as actionTypes from './actionTypes';

export const getUser = () => {
    return async dispatch => {
        try {   
            const user = await fetch("http://localhost:5000/user", {
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            })

            const userData = await user.json();

            dispatch({
                type: actionTypes.GET_USER,
                user: userData
            })

        } catch (err) {
            console.error(err.message)
        }
    }
}