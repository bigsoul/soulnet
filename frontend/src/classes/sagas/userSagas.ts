//#region Import

import { fork, put } from "redux-saga/effects";

//#endregion

import {
	IUserLocalStorageLoadAction,
	USER_LOCAL_STORAGE_LOAD,
} from "../actions/IUserAction";

function* workerUserInit() {
	yield put<IUserLocalStorageLoadAction>({
		type: USER_LOCAL_STORAGE_LOAD,
		serviceUrl: "http://localhost:3000/",
		serviceJwtToken: "1",
	});
}

function* userSagas() {
	yield fork(workerUserInit);
}

export default userSagas;
