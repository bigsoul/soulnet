import { fork, put, takeLatest } from "redux-saga/effects";

import {
	IUserLocalStorageLoadAction,
	IUserSignInAction,
	USER_LOCAL_STORAGE_LOAD,
	USER_SIGNIN,
} from "../actions/IUserAction";

function* workerUserInit() {
	yield put<IUserLocalStorageLoadAction>({
		type: USER_LOCAL_STORAGE_LOAD,
		serviceUrl: "http://localhost:5000/",
		serviceJwtToken: "",
	});
}

function* workerUserSignIn(action: IUserSignInAction) {}

function* userSagas() {
	yield fork(workerUserInit);
	yield takeLatest(USER_SIGNIN, workerUserSignIn);
}

export default userSagas;
