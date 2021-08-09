import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./userReduser";
import routerReducer from "./routerReducer";
import treeReducer from "./treeReducer";
import formsReducer from "./formReducer";
import notificationReducer from "./notificationReducer";

const createRootReducer = () =>
	combineReducers({
		user: userReducer,
		router: routerReducer,
		form: formReducer,
		tree: treeReducer,
		forms: formsReducer,
		notification: notificationReducer,
	});

export default createRootReducer;
