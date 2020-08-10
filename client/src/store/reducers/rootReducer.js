import { combineReducers } from "redux";
import colorsReducer from "./colorsReducer";

export const rootReducer = combineReducers({
    colors: colorsReducer
})