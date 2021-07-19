import service from "../utils/service";

import { call, fork, put, takeLatest } from "redux-saga/effects";
import { startSubmit, stopSubmit, destroy } from "redux-form";
import { history } from "../reducers/routerReducer";

import * as ACT from "../actions/IUserAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

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
	yield put<ACT.IUserLocalStorageLoadAction>({
		type: ACT.USER_LOCAL_STORAGE_LOAD,
		id: localStorage.getItem("userId") || "",
		serviceJwtToken: localStorage.getItem("serviceJwtToken") || "",
		serviceJwtTokenExpirationTime: Number(
			localStorage.getItem("serviceJwtTokenExpirationTime")
		),
	});
	yield put<ACT.IUserEnviromentLoadAction>({
		type: ACT.USER_ENVIROMENT_LOAD,
		serviceUrl: process.env.REACT_APP_SERVICE_URL || "",
	});
}

function* workerUserSignIn(action: ACT.IUserSignInAction) {
	try {
		yield put(startSubmit("signIn"));

		const requestData: REQ.ISignInRequest = {
			username: action.username,
			password: action.password,
		};

		const responseBody: { data: RES.IAuthDataResponse } = yield call(
			service.post,
			"/auth/signin",
			requestData,
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

		yield put<ACT.IUserSignSuccessAction>({
			type: ACT.USER_SIGN_SUCCESS,
			id: responseData.id,
			username: action.username,
			jwtToken: responseData.jwtToken,
			jwtTokenExpirationTime: responseData.jwtTokenExpirationTime,
		});

		yield put(destroy("signIn"));

		history.push("/");
	} catch (err) {
		clearLocalStorage();

		yield put<ACT.IUserSignFieldAction>({
			type: ACT.USER_SIGN_FIELD,
			error: "",
		});

		yield put(stopSubmit("signIn", { _error: "Signin feild !" }));
	}
}

function* workerUserSignUp(action: ACT.IUserSignUpAction) {
	try {
		yield put(startSubmit("signUp"));

		const requestData: REQ.ISignUpRequest = {
			username: action.username,
			email: action.email,
			password: action.password,
		};

		const responseBody: { data: RES.IAuthDataResponse } = yield call(
			service.post,
			"/auth/signup",
			requestData,
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

		yield put<ACT.IUserSignSuccessAction>({
			type: ACT.USER_SIGN_SUCCESS,
			id: responseData.id,
			username: action.username,
			jwtToken: responseData.jwtToken,
			jwtTokenExpirationTime: responseData.jwtTokenExpirationTime,
		});

		yield put(stopSubmit("signUp"));

		history.push("/");
	} catch (err) {
		clearLocalStorage();

		yield put<ACT.IUserSignFieldAction>({
			type: ACT.USER_SIGN_FIELD,
			error: "",
		});

		yield put(stopSubmit("signUp", { _error: "Signup feild !" }));
	}
}

function* workerUserSignOut(action: ACT.IUserSignOutAction) {
	clearLocalStorage();

	yield put<ACT.IUserSignSuccessAction>({
		type: ACT.USER_SIGN_SUCCESS,
		id: "",
		username: "",
		jwtToken: "",
		jwtTokenExpirationTime: 0,
	});

	history.push("/signin");
}

function* userSagas() {
	yield fork(workerUserInit);
	yield takeLatest(ACT.USER_SIGNIN, workerUserSignIn);
	yield takeLatest(ACT.USER_SIGNUP, workerUserSignUp);
	yield takeLatest(ACT.USER_SIGNOUT, workerUserSignOut);
}

export default userSagas;
