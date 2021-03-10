import { takeLatest } from "redux-saga/effects";
import { history } from "../reducers/routerReducer";

import * as ACT from "../actions/IPathAction";

function workerPathToSignIn() {
	history.push("/signin");
}

function* pathSagas() {
	yield takeLatest(ACT.PATH_TO_SIGNIN, workerPathToSignIn);
}

export default pathSagas;
