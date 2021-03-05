import axiosAsync from "./../utils/http";

import { call, fork, put, takeLatest } from "redux-saga/effects";
import { startSubmit, stopSubmit, destroy } from "redux-form";
import { history } from "../reducers/routerReducer";

import * as Act from "../actions/IUserAction";
import * as Req from "../../interfaces/IRequest";
import * as Res from "../../interfaces/IResponse";

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
	yield put<Act.IUserLocalStorageLoadAction>({
		type: Act.USER_LOCAL_STORAGE_LOAD,
		id: localStorage.getItem("userId") || "",
		serviceJwtToken: localStorage.getItem("serviceJwtToken") || "",
		serviceJwtTokenExpirationTime: Number(
			localStorage.getItem("serviceJwtTokenExpirationTime")
		),
	});
	yield put<Act.IUserEnviromentLoadAction>({
		type: Act.USER_ENVIROMENT_LOAD,
		serviceUrl: process.env.REACT_APP_SERVICE_URL || "",
	});
}

function* workerUserSignIn(action: Act.IUserSignInAction) {
	try {
		yield put(startSubmit("signIn"));

		const requestData: Req.ISignInRequest = {
			username: action.username,
			password: action.password,
		};

		const responseBody: { data: Res.IAuthDataResponse } = yield call(
			axiosAsync,
			"/auth/signin",
			requestData
		);

		const responseData = responseBody.data;

		setLocalStorage(
			action.username,
			action.rememberMe,
			responseData.id,
			responseData.jwtToken,
			responseData.jwtTokenExpirationTime
		);

		yield put<Act.IUserSignSuccessAction>({
			type: Act.USER_SIGN_SUCCESS,
			id: responseData.id,
			username: action.username,
			jwtToken: responseData.jwtToken,
			jwtTokenExpirationTime: responseData.jwtTokenExpirationTime,
		});

		yield put(destroy("signIn"));

		history.push("/");
	} catch (err) {
		clearLocalStorage();

		yield put<Act.IUserSignFieldAction>({
			type: Act.USER_SIGN_FIELD,
			error: "",
		});

		yield put(stopSubmit("signIn", { _error: "Signin feild !" }));
	}
}

function* workerUserSignUp(action: Act.IUserSignUpAction) {
	try {
		yield put(startSubmit("signUp"));

		const requestData: Req.ISignUpRequest = {
			username: action.username,
			email: action.email,
			password: action.password,
		};

		const responseBody: { data: Res.IAuthDataResponse } = yield call(
			axiosAsync,
			"/auth/signup",
			requestData
		);

		const responseData = responseBody.data;

		setLocalStorage(
			action.username,
			action.rememberMe,
			responseData.id,
			responseData.jwtToken,
			responseData.jwtTokenExpirationTime
		);

		yield put<Act.IUserSignSuccessAction>({
			type: Act.USER_SIGN_SUCCESS,
			id: responseData.id,
			username: action.username,
			jwtToken: responseData.jwtToken,
			jwtTokenExpirationTime: responseData.jwtTokenExpirationTime,
		});

		yield put(stopSubmit("signUp"));

		history.push("/");
	} catch (err) {
		clearLocalStorage();

		yield put<Act.IUserSignFieldAction>({
			type: Act.USER_SIGN_FIELD,
			error: "",
		});

		yield put(stopSubmit("signUp", { _error: "Signup feild !" }));
	}
}

function* workerUserSignOut(action: Act.IUserSignOutAction) {
	clearLocalStorage();

	yield put<Act.IUserSignSuccessAction>({
		type: Act.USER_SIGN_SUCCESS,
		id: "",
		username: "",
		jwtToken: "",
		jwtTokenExpirationTime: 0,
	});

	history.push("/signin");
}

function* userSagas() {
	yield fork(workerUserInit);
	yield takeLatest(Act.USER_SIGNIN, workerUserSignIn);
	yield takeLatest(Act.USER_SIGNUP, workerUserSignUp);
	yield takeLatest(Act.USER_SIGNOUT, workerUserSignOut);
}

export default userSagas;
