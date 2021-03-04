import { takeLatest } from "redux-saga/effects";
import { PATH_TO_SIGNIN } from "../actions/IPathAction";
import { history } from "../reducers/routerReducer";

function workerPathToSignIn() {
	history.push("/signin");
}

function* pathSagas() {
	yield takeLatest(PATH_TO_SIGNIN, workerPathToSignIn);
}

export default pathSagas;
