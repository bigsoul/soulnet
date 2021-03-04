import { change, actionTypes, FormAction } from "redux-form";
import { put, takeLatest } from "redux-saga/effects";

function* workerInitialize(action: FormAction) {
	console.log("workerTest: ", action);
	if (action.meta.form === "signIn") {
		const username = localStorage.getItem("username") || "";
		const rememberMe = localStorage.getItem("rememberMe") || 0;
		yield put(change("signIn", "username", username));
		yield put(change("signIn", "rememberMe", Boolean(Number(rememberMe))));
	}
}

function* formSagas() {
	yield takeLatest(actionTypes.INITIALIZE, workerInitialize);
}

export default formSagas;
