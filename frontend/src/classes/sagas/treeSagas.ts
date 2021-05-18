import service from "../utils/service";

import { call, put, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/ITreeAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";

import ILearning from "../../interfaces/ILearning";
import ELearningState from "../../enums/ELearningState";

function* workerTreeOnLoadEvent(action: ACT.ITreeOnLoadAction) {
	/*const result: ILearning[] = [];

	for (
		let i = action.dataOffset;
		i < action.dataOffset + action.dataLimit;
		i++
	)
		result.push({
			id: i.toString(),
			name: "Name #" + i,
			state: ELearningState.completed,
			isArchive: false,
			iterationCount: 0,
			iterationCurrent: 0,
			inputNeuronsCount: 0,
			deepLayersCount: 0,
			datasetId: "",
		});*/

	const requestData: REQ.ILearningRequest = {
		startFrom: action.dataOffset,
		pageSize: action.dataLimit,
		isArchive: false,
	};

	const responseBody: { data: RES.ILearningResponse } = yield call(
		service.get,
		"/learnings",
		requestData
	);

	yield put<ACT.ITreeOnLoadAction>({
		type: ACT.TREE_ON_LOAD,
		list: responseBody.data.list,
		listKey: action.listKey,
		dataLimit: responseBody.data.dataLimit,
		dataOffset: responseBody.data.dataOffset,
	});
}

function* treeSagas() {
	yield takeLatest(ACT.TREE_ON_LOAD_EVENT, workerTreeOnLoadEvent);
}

export default treeSagas;
