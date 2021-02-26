import { call, fork, put, takeLatest } from "redux-saga/effects";
import axiosAsync from "./../utils/http";

import {
	IUserEnviromentLoadAction,
	IUserLocalStorageLoadAction,
	IUserSignFieldAction,
	IUserSignInAction,
	IUserSignOutAction,
	IUserSignSuccessAction,
	IUserSignUpAction,
	USER_ENVIROMENT_LOAD,
	USER_LOCAL_STORAGE_LOAD,
	USER_SIGNIN,
	USER_SIGNOUT,
	USER_SIGNUP,
	USER_SIGN_FIELD,
	USER_SIGN_SUCCESS,
} from "../actions/IUserAction";

import { ISignInRequest, ISignUpRequest } from "../../interfaces/IRequest";
import { IAuthDataResponse } from "../../interfaces/IResponse";
import { history } from "../reducers/routerReducer";

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

		const responseData: IAuthDataResponse = (yield call(
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

		yield put<IUserSignSuccessAction>({
			type: USER_SIGN_SUCCESS,
			id: responseData.id,
			login: action.login,
			jwtToken: responseData.jwtToken,
			jwtTokenExpirationTime: responseData.jwtTokenExpirationTime,
		});

		history.push("/");
	} catch (err) {
		localStorage.setItem("userId", "");
		localStorage.setItem("serviceJwtToken", "");
		localStorage.setItem("serviceJwtTokenExpirationTime", "");

		yield put<IUserSignFieldAction>({
			type: USER_SIGN_FIELD,
			error: "",
		});
	}
}

function* workerUserSignUp(action: IUserSignUpAction) {
	try {
		const requestData: ISignUpRequest = {
			login: action.login,
			email: action.email,
			password: action.password,
		};

		const responseData: IAuthDataResponse = (yield call(
			axiosAsync,
			"/auth/signup",
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

		yield put<IUserSignSuccessAction>({
			type: USER_SIGN_SUCCESS,
			id: responseData.id,
			login: action.login,
			jwtToken: responseData.jwtToken,
			jwtTokenExpirationTime: responseData.jwtTokenExpirationTime,
		});

		history.push("/");
	} catch (err) {
		localStorage.setItem("userId", "");
		localStorage.setItem("serviceJwtToken", "");
		localStorage.setItem("serviceJwtTokenExpirationTime", "");

		yield put<IUserSignFieldAction>({
			type: USER_SIGN_FIELD,
			error: "",
		});
	}
}

function* workerUserSignOut(action: IUserSignOutAction) {
	localStorage.setItem("userId", "");
	localStorage.setItem("serviceJwtToken", "");
	localStorage.setItem("serviceJwtTokenExpirationTime", "");

	yield put<IUserSignSuccessAction>({
		type: USER_SIGN_SUCCESS,
		id: "",
		login: "",
		jwtToken: "",
		jwtTokenExpirationTime: 0,
	});

	history.push("/signin");
}

function* userSagas() {
	yield fork(workerUserInit);
	yield takeLatest(USER_SIGNIN, workerUserSignIn);
	yield takeLatest(USER_SIGNUP, workerUserSignUp);
	yield takeLatest(USER_SIGNOUT, workerUserSignOut);
}

export default userSagas;
