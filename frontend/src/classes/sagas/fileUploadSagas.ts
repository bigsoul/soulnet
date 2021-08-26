import { takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/IFileUploadAction";

function* workerFileUploadStartEvent(action: ACT.IFileUploadStartEventAction) {
	yield null;
}

function* workerFileUploadStopEvent(action: ACT.IFileUploadStopEventAction) {
	yield null;
}

function* fileUploadSagas() {
	yield takeLatest(ACT.FILE_UPLOAD_START_EVENT, workerFileUploadStartEvent);
	yield takeLatest(ACT.FILE_UPLOAD_STOP_EVENT, workerFileUploadStopEvent);
}

export default fileUploadSagas;
