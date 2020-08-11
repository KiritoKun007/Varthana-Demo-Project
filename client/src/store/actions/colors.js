import * as actionTypes from './actionTypes';

export const getColors = () => {
    return async dispatch => {
        try {
            const colors = await fetch("http://localhost:5000/colors");
    
            const colorsData = await colors.json()

            dispatch({
                type: actionTypes.GET_ALL_COLORS,
                colors: colorsData
            })
            
        } catch (error) {
            console.error(error.message)
        }
    }
}

export const favColor = (id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.DRAGGED_FAV_COLOR,
            id: id
        })
    }
}

export const saveFavColors = (fav) => {
    return async dispatch => {
        try {
            const body = { fav }
    
            const updateResponse = await fetch(`http://localhost:5000/colors/fav`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }) 
    
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }
}