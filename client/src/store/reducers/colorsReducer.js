import * as actionTypes from '../actions/actionTypes';

const initialState = {
    colors: []
};

const getAllColors = (state, action) => {
    return {
        ...state,
        colors: action.colors
    }
}

const colorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_COLORS: return getAllColors(state, action)
        default:
            return state;
    }
}

export default colorsReducer;