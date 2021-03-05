import { takeLatest } from "redux-saga/effects";
import { history } from "../reducers/routerReducer";

import * as Act from "../actions/IPathAction";

function workerPathToSignIn() {
	history.push("/signin");
}

function* pathSagas() {
	yield takeLatest(Act.PATH_TO_SIGNIN, workerPathToSignIn);
}

export default pathSagas;
