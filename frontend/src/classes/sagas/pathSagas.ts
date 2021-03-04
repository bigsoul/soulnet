import { change } from "redux-form";
import { put, takeLatest, delay } from "redux-saga/effects";
import { IPathToSignInAction, PATH_TO_SIGNIN } from "../actions/IPathAction";
import { history } from "../reducers/routerReducer";
import store from "./../store";

function* workerPathToSignIn(action: IPathToSignInAction) {
	/*const state = store.getState();
	console.log("saga", state);
	if (!state.form.signIn) {
		history.push(action.path);
		yield delay(500);
		yield put(change("signIn", "username", "vvv"));
	}*/

	history.push(action.path);
	yield null;
}

function* userSagas() {
	yield takeLatest(PATH_TO_SIGNIN, workerPathToSignIn);
}

export default userSagas;
