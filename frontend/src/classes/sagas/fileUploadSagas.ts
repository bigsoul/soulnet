import axios, { AxiosRequestConfig } from "axios";
import { call, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/IFileUploadAction";
import store from "../store";

function* workerFileUploadSelectedEvent(
	action: ACT.IFileUploadSelectedEventAction
) {
	try {
		yield console.log("selected file: ", action.file);

		const chunkSize = 20_971_520;

		// cut the file into pieces

		const file = action.file;

		const chancks: Blob[] = [];

		let bytesRemaining = file.size;

		while (bytesRemaining > 0) {
			const positionStart = file.size - bytesRemaining;
			const positionEnd =
				chunkSize <= bytesRemaining
					? positionStart + chunkSize
					: file.size;
			chancks.push(file.slice(positionStart, positionEnd));
			bytesRemaining -= positionEnd - positionStart;
		}

		// setup axios request

		const { user } = store.getState();

		const config: AxiosRequestConfig = {
			baseURL: user.serviceUrl,
			headers: {
				Authorization: "Bearer " + user.serviceJwtToken,
				"Content-Type": "application/octet-stream",
			},
			onUploadProgress: (e: { loaded: number; total: number }) => {
				console.log(e);
			},
		};

		// get new operation id

		config.params = {
			id: "",
			size: file.size,
		};

		const response: {
			data: {
				id: string;
				totalSize: number;
				totalReceived: number;
			};
		} = yield call(axios.get, user.serviceUrl + "/datafiles", config);

		config.params = {
			id: response.data.id,
		};

		// sending file data

		for (let i = 0; i < chancks.length; i++) {
			console.log("blob chunk: ", chancks[i]);

			yield call(
				axios.post,
				user.serviceUrl + "/datafiles",
				chancks[i],
				config
			);
		}
	} catch (err) {
		yield console.log(err);
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
