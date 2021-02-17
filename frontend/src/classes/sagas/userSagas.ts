import { fork, put } from "redux-saga/effects";

import {
	IUserLocalStorageLoadAction,
	USER_LOCAL_STORAGE_LOAD,
} from "../actions/IUserAction";

function* workerUserInit() {
	yield put<IUserLocalStorageLoadAction>({
		type: USER_LOCAL_STORAGE_LOAD,
		serviceUrl: "http://localhost:5000/",
		serviceJwtToken: "",
	});
}

function* userSagas() {
	yield fork(workerUserInit);
}

export default userSagas;
