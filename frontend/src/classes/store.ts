import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createRootReducer from "./reducers";
import userSagas from "./sagas/userSagas";
import pathSagas from "./sagas/pathSagas";
import formSagas from "./sagas/formSagas";
import treeSagas from "./sagas/treeSagas";
import formsSagas from "./sagas/formsSagas";
import globalSagas from "./sagas/globalSagas";

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
	sagaMiddleware.run(treeSagas);
	sagaMiddleware.run(formsSagas);
	sagaMiddleware.run(globalSagas);

	return store;
};

const store = configureStore();

export type IStore = ReturnType<typeof store.getState>;

export default store;
