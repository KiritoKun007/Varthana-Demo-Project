import { combineReducers } from "redux";
import colorsReducer from "./colorsReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    colors: colorsReducer,
    auth: authReducer,
    user: userReducer
})