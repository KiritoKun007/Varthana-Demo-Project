import * as actionTypes from '../actions/actionTypes';

const initialState = {
    colors: [],
    favColorsId: []
};

const getAllColors = (state, action) => {
    return {
        ...state,
        colors: action.colors
    }
}

const draggedFavColor = (state, action) => {
    const colors = [...state.colors];
    let fav = colors.map(color => {
                        if(color.color_id === action.id) {
                            color.is_fav = true
                        }
                        return color;
                    })
    return {
        ...state,
        colors: fav,
        favColorsId: [...state.favColorsId].concat(action.id)
    }
}

const colorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_COLORS: return getAllColors(state, action);
        case actionTypes.DRAGGED_FAV_COLOR: return draggedFavColor(state, action);
        default:
            return state;
    }
}

export default colorsReducer;