import * as actionTypes from '../actions/actionTypes';

const initialState = {
    colors: [],
    newFavColorsId: [],
    favColorsId: [],
    successMsg: ''
};

const getAllColors = (state, action) => {
    const colors = action.colors.map(color => {
        color.is_fav = false;

        return color
    });
    return {
        ...state,
        newFavColorsId: [],
        colors: colors
    }
}

const draggedFavColor = (state, action) => {
    
    const colors = [...state.colors];

    let isDraggable = false

    let fav = colors.map(color => {
                        if(color.color_id === action.id) {
                            if(!color.is_fav) {
                                color.is_fav = true
                                isDraggable = true
                            }
                        }
                        return color;
                    })

    return {
        ...state,
        colors: fav,
        newFavColorsId: isDraggable ? [...state.newFavColorsId].concat(action.id) : [...state.newFavColorsId]
    }
}

const getFavColorsIds = (state, action) => {

    let arr = []

    arr = action.ids.reduce((prevArr, curr) => {
        return prevArr.concat(curr.color_id)
    }, [])

    const colors = [...state.colors].map(color => {
        if(arr.includes(color.color_id)) {
            color.is_fav = true
        }

        return color
    })

    return {
        ...state,
        colors: colors,
        favColorsId: arr
    }
}

const saveFavouriteColors = (state, action) => {
    return {
        ...state,
        successMsg: action.successMsg,
        newFavColorsId: []
    }
}

const cancelFavColors = (state, action) => {

    const colors = [...state.colors].map(color => {
        if([...state.newFavColorsId].includes(color.color_id)) {
            color.is_fav = false
        }

        return color
    })

    return {
        ...state,
        colors: colors,
        newFavColorsId: []
    }
}

const colorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_COLORS: return getAllColors(state, action);
        case actionTypes.DRAGGED_FAV_COLOR: return draggedFavColor(state, action);
        case actionTypes.GET_FAV_COLOR_IDS: return getFavColorsIds(state, action);
        case actionTypes.SAVE_FAVOURITE_COLORS: return saveFavouriteColors(state, action);
        case actionTypes.CANCEL_FAV_COLORS: return cancelFavColors(state, action);
        default:
            return state;
    }
}

export default colorsReducer;