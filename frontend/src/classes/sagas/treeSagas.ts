import service from "../utils/service";

import { call, put, takeEvery } from "redux-saga/effects";

import * as ACT from "../actions/ITreeAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";
import IStore from "../../interfaces/IStore";

function* workerTreeOnLoadEvent(action: ACT.ITreeOnLoadEventAction) {
	const state: IStore = yield call(store.getState);

	const { tree } = state;

	if (tree[action.listKey].isLoading) return;

	console.debug(
		`workerTreeOnLoadEvent(${action.listKey.toString()}): `,
		tree[action.listKey]
	);

	const requestData: REQ.ITreeRequest = {
		dataOffset: action.dataOffset,
		dataLimit: action.dataLimit,
		filter: action.filter,
	};

	yield put<ACT.ITreeIsLoadingAction>({
		type: ACT.TREE_IS_LOADING,
		listKey: action.listKey,
		loading: true,
	});

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

	yield put<ACT.ITreeIsLoadingAction>({
		type: ACT.TREE_IS_LOADING,
		listKey: action.listKey,
		loading: false,
	});
}

function* treeSagas() {
	yield takeEvery(ACT.TREE_ON_LOAD_EVENT, workerTreeOnLoadEvent);
}

export default treeSagas;
