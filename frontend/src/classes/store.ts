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
import notificationSagas from "./sagas/notificationSagas";
import fileUploadSagas from "./sagas/fileUploadSagas";

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
	sagaMiddleware.run(notificationSagas);
	sagaMiddleware.run(fileUploadSagas);

	return store;
};

const store = configureStore();

export type IStore = ReturnType<typeof store.getState>;

export default store;
