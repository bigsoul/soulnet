import { call, delay, takeEvery } from "redux-saga/effects";

import * as ACT from "../actions/INotificationAction";

function* workerNotificationOpenEvent(
	action: ACT.INotificationOpenEventAction
) {
	const pause = 5000;

	const timeStart = Date.now();
	const timeEnd = timeStart + pause;

	yield call(ACT.doNotificatioOpen, {
		status: action.status,
		heading: action.heading,
		message: action.message,
		timeStart: timeStart,
		timeEnd: timeEnd,
	});

	yield delay(pause);

	yield call(ACT.doNotificatioClose, {
		timeStart: timeStart,
	});
}

function* notificationSagas() {
	yield takeEvery("NOTIFICATION/OPEN-EVENT", workerNotificationOpenEvent);
}

export default notificationSagas;
