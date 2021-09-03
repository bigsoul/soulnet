import axios from "axios";
import { call, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/IFileUploadAction";
import store from "../store";

function* workerFileUploadSelectedEvent(
	action: ACT.IFileUploadSelectedEventAction
) {
	yield console.log("selected file: ", action.file);

	const { user } = store.getState();
	const chunkSize = 20_971_520;

	const config = {
		baseURL: user.serviceUrl,
		headers: {
			Authorization: "Bearer " + user.serviceJwtToken,
			"Content-Type": "application/octet-stream",
		},
		params: {
			id: "7b7a6959-c7ca-4067-9482-b40017641e25",
		},
		onUploadProgress: (e: { loaded: number; total: number }) => {
			console.log(e);
		},
	};

	const file = action.file;

	const chancks: Blob[] = [];

	let bytesRemaining = file.size;

	while (bytesRemaining > 0) {
		const positionStart = file.size - bytesRemaining;
		const positionEnd =
			chunkSize <= bytesRemaining ? positionStart + chunkSize : file.size;
		chancks.push(file.slice(positionStart, positionEnd));
		bytesRemaining -= positionEnd - positionStart;
	}

	for (let i = 0; i < chancks.length; i++) {
		yield console.log("blob chunk: ", chancks[i]);
		yield call(
			axios.post,
			user.serviceUrl + "/datafiles",
			chancks[i],
			config
		);
	}
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
