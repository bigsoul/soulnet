import { call, fork, put, takeLatest } from "redux-saga/effects";
import axiosAsync from "./../utils/http";
import { startSubmit, stopSubmit, change, destroy } from "redux-form";

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

function setLocalStorage(
	username: string,
	rememberMe: boolean,
	userId: string,
	jwtToken: string,
	jwtTokenExpirationTime: number
) {
	localStorage.setItem("username", username);
	localStorage.setItem("rememberMe", rememberMe ? "1" : "0");
	if (rememberMe) {
		localStorage.setItem("userId", userId);
		localStorage.setItem("serviceJwtToken", jwtToken);
		localStorage.setItem(
			"serviceJwtTokenExpirationTime",
			jwtTokenExpirationTime.toString()
		);
	} else {
		localStorage.setItem("userId", "");
		localStorage.setItem("serviceJwtToken", "");
		localStorage.setItem("serviceJwtTokenExpirationTime", "");
	}
}

function clearLocalStorage() {
	localStorage.setItem("userId", "");
	localStorage.setItem("serviceJwtToken", "");
	localStorage.setItem("serviceJwtTokenExpirationTime", "");
}

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
		yield put(startSubmit("signIn"));

		const requestData: ISignInRequest = {
			username: action.username,
			password: action.password,
		};

		const responseData: IAuthDataResponse = (yield call(
			axiosAsync,
			"/auth/signin",
			requestData
		)).data;

		setLocalStorage(
			action.username,
			action.rememberMe,
			responseData.id,
			responseData.jwtToken,
			responseData.jwtTokenExpirationTime
		);

		yield put<IUserSignSuccessAction>({
			type: USER_SIGN_SUCCESS,
			id: responseData.id,
			username: action.username,
			jwtToken: responseData.jwtToken,
			jwtTokenExpirationTime: responseData.jwtTokenExpirationTime,
		});

		yield put(destroy("signIn"));

		history.push("/");
	} catch (err) {
		clearLocalStorage();

		yield put<IUserSignFieldAction>({
			type: USER_SIGN_FIELD,
			error: "",
		});

		yield put(stopSubmit("signIn", { _error: "Signin feild !" }));
	}
}

function* workerUserSignUp(action: IUserSignUpAction) {
	try {
		const requestData: ISignUpRequest = {
			username: action.username,
			email: action.email,
			password: action.password,
		};

		const responseData: IAuthDataResponse = (yield call(
			axiosAsync,
			"/auth/signup",
			requestData
		)).data;

		setLocalStorage(
			action.username,
			action.rememberMe,
			responseData.id,
			responseData.jwtToken,
			responseData.jwtTokenExpirationTime
		);

		yield put<IUserSignSuccessAction>({
			type: USER_SIGN_SUCCESS,
			id: responseData.id,
			username: action.username,
			jwtToken: responseData.jwtToken,
			jwtTokenExpirationTime: responseData.jwtTokenExpirationTime,
		});

		history.push("/");
	} catch (err) {
		clearLocalStorage();

		yield put<IUserSignFieldAction>({
			type: USER_SIGN_FIELD,
			error: "",
		});
	}
}

function* workerUserSignOut(action: IUserSignOutAction) {
	clearLocalStorage();

	yield put<IUserSignSuccessAction>({
		type: USER_SIGN_SUCCESS,
		id: "",
		username: "",
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
