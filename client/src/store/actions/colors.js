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

export const getFavColorsId = () => {
    return async dispatch => {
        try {
            const favColorId = await fetch("http://localhost:5000/colors/favIds", {
                method: 'GET',
                headers: {
                    token: localStorage.token
                }
            });

            const favColorIdData = await favColorId.json();

            console.log(favColorIdData)

            dispatch({
                type: actionTypes.GET_FAV_COLOR_IDS,
                ids: favColorIdData
            })

        } catch (err) {
            console.error(err.message)            
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
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(body)
            }) 
    
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }
}