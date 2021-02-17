import { combineReducers } from "redux";

import userReducer from "./userReduser";
import routerReducer from "./routerReducer";

const createRootReducer = () =>
	combineReducers({
		user: userReducer,
		router: routerReducer,
	});

export default createRootReducer;
