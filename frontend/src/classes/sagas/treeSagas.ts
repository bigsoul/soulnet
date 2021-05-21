import service from "../utils/service";

import { call, delay, put, takeEvery, takeLeading } from "redux-saga/effects";

import * as ACT from "../actions/ITreeAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";
import IStore from "../../interfaces/IStore";

function* workerTreeOnLoadEvent(action: ACT.ITreeOnLoadEventAction) {
	const state: IStore = yield call(store.getState);

	const { tree } = state;

	console.debug(
		`workerTreeOnLoadEvent(${action.listKey.toString()}): `,
		tree[action.listKey]
	);

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

	yield put<ACT.ITreeBranchLoadingAction>({
		type: ACT.TREE_BRANCH_LOADING,
		listKey: action.listKey,
		loading: true,
	});

	yield put<ACT.ITreeOnLoadAction>({
		type: ACT.TREE_ON_LOAD,
		list: responseBody.data.list,
		listKey: action.listKey,
		dataLimit: responseBody.data.dataLimit,
		dataOffset: responseBody.data.dataOffset,
	});

	yield put<ACT.ITreeBranchLoadingAction>({
		type: ACT.TREE_BRANCH_LOADING,
		listKey: action.listKey,
		loading: false,
	});
}

function* treeSagas() {
	yield takeEvery(ACT.TREE_ON_LOAD_EVENT, workerTreeOnLoadEvent);
}

export default treeSagas;
