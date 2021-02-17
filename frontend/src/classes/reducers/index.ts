//#region Import

import { combineReducers } from "redux";

//#endregion

//#region Import Clases

import userReducer from "./userReduser";

//#endregion

const createRootReducer = () =>
	combineReducers({
		user: userReducer,
	});

export default createRootReducer;
