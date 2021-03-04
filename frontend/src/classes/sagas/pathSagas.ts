import { change, actionTypes, FormAction } from "redux-form";
import { put, takeLatest } from "redux-saga/effects";
import { PATH_TO_SIGNIN } from "../actions/IPathAction";
import { history } from "../reducers/routerReducer";

function workerPathToSignIn() {
	history.push("/signin");
}

function* workerTest(action: FormAction) {
	console.log("workerTest: ", action);
	if (action.meta.form === "signIn")
		yield put(change("signIn", "username", "vvv"));
}

function* userSagas() {
	yield takeLatest(PATH_TO_SIGNIN, workerPathToSignIn);
	yield takeLatest(actionTypes.INITIALIZE, workerTest);
}

export default userSagas;
