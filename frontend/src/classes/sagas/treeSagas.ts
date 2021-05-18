import service from "../utils/service";

import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/ITreeAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";

import ILearning, { ILearningFilter } from "../../interfaces/ILearning";
import ELearningState from "../../enums/ELearningState";
import { TreeListEntityFilters } from "../reducers/treeReducer";

function* workerTreeOnLoadEvent(action: ACT.ITreeOnLoadEventAction) {
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

	const requestData: REQ.ITreeRequest = {
		dataOffset: action.dataOffset,
		dataLimit: action.dataLimit,
		filter: action.filter,
	};

	const responseBody: { data: RES.ITreeResultResponse } = yield call(
		service.get,
		action.controller,
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
	yield takeEvery(ACT.TREE_ON_LOAD_EVENT, workerTreeOnLoadEvent);
}

export default treeSagas;
