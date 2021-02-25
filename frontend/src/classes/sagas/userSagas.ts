import { call, fork, put, takeLatest } from "redux-saga/effects";
import axiosAsync from "./../utils/http";

import {
	IUserEnviromentLoadAction,
	IUserLocalStorageLoadAction,
	IUserSignInAction,
	IUserSignInFieldAction,
	IUserSignInSuccessAction,
	USER_ENVIROMENT_LOAD,
	USER_LOCAL_STORAGE_LOAD,
	USER_SIGNIN,
	USER_SIGNIN_FIELD,
	USER_SIGNIN_SUCCESS,
} from "../actions/IUserAction";

import { ISignInRequest } from "../../interfaces/IRequest";
import { ISignInResponse } from "../../interfaces/IResponse";

function* workerUserInit() {
	yield put<IUserLocalStorageLoadAction>({
		type: USER_LOCAL_STORAGE_LOAD,
		id: localStorage.getItem("userId") || "",
		serviceJwtToken: localStorage.getItem("serviceJwtToken") || "",
		serviceJwtTokenExpirationTime: Number(
			localStorage.getItem("serviceJwtTokenExpirationTime")
		),
	});
	yield put<IUserEnviromentLoadAction>({
		type: USER_ENVIROMENT_LOAD,
		serviceUrl: process.env.REACT_APP_SERVICE_URL || "",
	});
}

function* workerUserSignIn(action: IUserSignInAction) {
	try {
		const requestData: ISignInRequest = {
			login: action.login,
			password: action.password,
		};

		const responseData: ISignInResponse = (yield call(
			axiosAsync,
			"/auth/signin",
			requestData
		)).data;

		if (action.rememberMe) {
			localStorage.setItem("userId", responseData.id);
			localStorage.setItem("serviceJwtToken", responseData.jwtToken);
			localStorage.setItem(
				"serviceJwtTokenExpirationTime",
				responseData.jwtTokenExpirationTime.toString()
			);
		} else {
			localStorage.setItem("userId", "");
			localStorage.setItem("serviceJwtToken", "");
			localStorage.setItem("serviceJwtTokenExpirationTime", "");
		}

		yield put<IUserSignInSuccessAction>({
			type: USER_SIGNIN_SUCCESS,
			id: responseData.id,
			login: action.login,
			jwtToken: responseData.jwtToken,
			jwtTokenExpirationTime: responseData.jwtTokenExpirationTime,
		});
	} catch (err) {
		localStorage.setItem("userId", "");
		localStorage.setItem("serviceJwtToken", "");
		localStorage.setItem("serviceJwtTokenExpirationTime", "");

		yield put<IUserSignInFieldAction>({
			type: USER_SIGNIN_FIELD,
			error: "",
		});
	}
}

function* userSagas() {
	yield fork(workerUserInit);
	yield takeLatest(USER_SIGNIN, workerUserSignIn);
}

export default userSagas;
