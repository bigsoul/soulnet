import { call, takeEvery } from "redux-saga/effects";

import * as ACT from "../actions/INotificationAction";

function* workerNotificationOpenEvent(
	action: ACT.INotificationOpenEventAction
) {
	yield console.log("NOTIFICATION/OPEN-EVENT");

	yield call(ACT.doNotificatioSuccessOpen, {
		heading: action.heading,
		message: action.message,
		timeStart: Date.now(),
	});
}

function* notificationSagas() {
	yield takeEvery("NOTIFICATION/OPEN-EVENT", workerNotificationOpenEvent);
}

export default notificationSagas;
