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