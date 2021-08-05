import { takeEvery } from "redux-saga/effects";

import * as ACT from "../actions/IGlobalAction";

function* workerGlobalClickEvent(action: ACT.IGlobalClickEventAction) {
	yield console.log("GLOBAL/CLICK-EVENT");
}

function* formsSagas() {
	yield takeEvery("GLOBAL/CLICK-EVENT", workerGlobalClickEvent);
}

export default formsSagas;
