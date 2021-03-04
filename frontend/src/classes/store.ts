import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createRootReducer from "./reducers";
import userSagas from "./sagas/userSagas";
import pathSagas from "./sagas/pathSagas";
import formSagas from "./sagas/formSagas";

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
	const store = createStore(
		createRootReducer(),
		{},
		composeWithDevTools(applyMiddleware(sagaMiddleware))
	);

	sagaMiddleware.run(userSagas);
	sagaMiddleware.run(pathSagas);
	sagaMiddleware.run(formSagas);

	return store;
};

export default configureStore();
