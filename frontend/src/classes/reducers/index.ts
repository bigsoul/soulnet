import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./userReduser";
import routerReducer from "./routerReducer";

const createRootReducer = () =>
	combineReducers({
		user: userReducer,
		router: routerReducer,
		form: formReducer,
	});

export default createRootReducer;
