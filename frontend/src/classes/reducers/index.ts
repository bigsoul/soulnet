import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./userReduser";
import learningReducer from "./learningReducer";
import routerReducer from "./routerReducer";
import treeReducer from "./treeReducer";

const createRootReducer = () =>
	combineReducers({
		user: userReducer,
		router: routerReducer,
		learning: learningReducer,
		form: formReducer,
		tree: treeReducer,
	});

export default createRootReducer;
