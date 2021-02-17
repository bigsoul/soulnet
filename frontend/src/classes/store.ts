//#region Import

import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

//#endregion

//#region Import Classes

import createRootReducer from "./reducers";

import userSagas from "./sagas/userSagas";

//#endregion

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
	const store = createStore(
		createRootReducer(),
		{},
		composeWithDevTools(applyMiddleware(sagaMiddleware))
	);

	sagaMiddleware.run(userSagas);

	return store;
};

export default configureStore();
