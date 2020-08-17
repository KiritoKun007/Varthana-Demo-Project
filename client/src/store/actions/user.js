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

export const editUser = (user) => {
    return async dispatch => {
        try {
            const body = {...user};

            const updatedUser = await fetch("http://localhost:5000/user/edit", {
                method: 'PUT',
                headers: {
                    token: localStorage.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            const data = await updatedUser.json();

            dispatch({
                type: actionTypes.EDIT_USER,
                user: data
            })

        } catch (err) {
            console.error(err.message)
        }
    }
}