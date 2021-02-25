import { call, fork, put, takeLatest } from "redux-saga/effects";
import axiosAsync from "./../utils/http";

import {
	IUserEnviromentLoadAction,
	IUserLocalStorageLoadAction,
	IUserSignInAction,
	USER_ENVIROMENT_LOAD,
	USER_LOCAL_STORAGE_LOAD,
	USER_SIGNIN,
} from "../actions/IUserAction";

import { ISignInRequest } from "../../interfaces/IRequest";
import { ISignInResponse } from "../../interfaces/IResponse";

function* workerUserInit() {
	yield put<IUserLocalStorageLoadAction>({
		type: USER_LOCAL_STORAGE_LOAD,
		serviceJwtToken: "",
		serviceJwtTokenExpirationTime: 0,
	});
	yield put<IUserEnviromentLoadAction>({
		type: USER_ENVIROMENT_LOAD,
		serviceUrl: "http://localhost:5000/",
	});
}

function* workerUserSignIn(action: IUserSignInAction) {
	const requestData: ISignInRequest = {
		login: action.login,
		password: action.password,
	};

	const responseData: ISignInResponse = (yield call(
		axiosAsync,
		"LoginIn",
		requestData
	)).data;

	localStorage.setItem("serviceJwtToken", responseData.jwtToken);
	localStorage.setItem(
		"serviceJwtTokenExpirationTime",
		responseData.jwtTokenExpirationTime.toString()
	);
}

function* userSagas() {
	yield fork(workerUserInit);
	yield takeLatest(USER_SIGNIN, workerUserSignIn);
}

export default userSagas;
