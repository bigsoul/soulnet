import service from "../utils/service";

import { call, put, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/ITreeAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";

import ILearning from "../../interfaces/ILearning";
import ELearningState from "../../enums/ELearningState";

function* workerTreeOnLoadEvent(action: ACT.ITreeOnLoadAction) {
	const result: ILearning[] = [];

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
		});

	yield put<ACT.ITreeOnLoadAction>({
		type: ACT.TREE_ON_LOAD,
		list: result,
		listKey: action.listKey,
		dataLimit: action.dataLimit,
		dataOffset: action.dataOffset,
	});
}

function* treeSagas() {
	yield takeLatest(ACT.TREE_ON_LOAD_EVENT, workerTreeOnLoadEvent);
}

export default treeSagas;
