import * as actionTypes from './actionTypes';
import { logout } from './auth';
import { BASE_URL } from '../../constants/constants';

export const getUser = () => {
    return async dispatch => {
        try {   
            const user = await fetch(`${BASE_URL}/user`, {
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

            const updatedUser = await fetch(`${BASE_URL}/user/edit`, {
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
                user: data,
                msg: "User details updated successfully."
            })

        } catch (err) {
            console.error(err.message)
        }
    }
}

export const inActiveUser = () => {
    return async dispatch => {
        try {
            
            const inActive = await fetch(`${BASE_URL}/user/inActive`, {
                method: 'PUT',
                headers: {
                    token: localStorage.token
                }
            })

            dispatch(logout())

        } catch (err) {
            console.error(err.message)
        }
    }
}