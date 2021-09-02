import axios from "axios";
import { takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/IFileUploadAction";
import store from "../store";

function* workerFileUploadSelectedEvent(
	action: ACT.IFileUploadSelectedEventAction
) {
	yield console.log("selected file: ", action.file);

	const { user } = store.getState();

	const config = {
		baseURL: user.serviceUrl,
		headers: {
			Authorization: "Bearer " + user.serviceJwtToken,
			"Content-Type": "application/octet-stream",
		},
	};

	const blob = action.file.slice(0, action.file.size);

	axios.post(user.serviceUrl + "/datafiles", blob, config);

	/*let ab = new ArrayBuffer(action.file.size);

	const fr = new FileReader();
	fr.readAsArrayBuffer(action.file);

	fr.onloadend = (e: ProgressEvent<FileReader>) => {
		ab = e.target?.result as ArrayBuffer;

		console.log("bytes: ", ab);

		return axios.post(user.serviceUrl + "/datafiles", ab, config);
	};*/
}

function* workerFileUploadStopEvent(action: ACT.IFileUploadStopEventAction) {
	yield null;
}

function* fileUploadSagas() {
	yield takeLatest(
		ACT.FILE_UPLOAD_SELECTED_EVENT,
		workerFileUploadSelectedEvent
	);
	yield takeLatest(ACT.FILE_UPLOAD_STOP_EVENT, workerFileUploadStopEvent);
}

export default fileUploadSagas;
