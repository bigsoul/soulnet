import service from "../utils/service";

import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/ILearningAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";

function* workerLearningDidUpdate(action: ACT.ILearningDidUpdateAction) {
	const state = store.getState();

	const {
		list,
		runningLoading,
		storingLoading,
		runningStartFrom,
		runningPageSize,
		storingStartFrom,
		storingPageSize,
		runningScrollTop,
		runningClientHeight,
		storingScrollTop,
		storingClientHeight,
	} = state.learning;

	yield put<ACT.ILearningSetDOMStateAction>({
		type: ACT.LEARNING_SET_DOM_STATE,
		runningScrollTop: action.runningScrollTop,
		runningClientHeight: action.runningClientHeight,
		storingScrollTop: action.storingScrollTop,
		storingClientHeight: action.storingClientHeight,
	});

	const isArchive = true;

	if (runningLoading && isArchive) return;
	if (storingLoading && !isArchive) return;

	yield put<ACT.ILearningBranchLoadingAction>({
		type: ACT.LEARNING_BRANCH_LOADING,
		branch: "running",
		loading: true,
	});

	const startFrom = isArchive ? runningStartFrom : storingStartFrom;
	const pageSize = isArchive ? runningPageSize : storingPageSize;

	const requestData: REQ.ILearningRequest = {
		startFrom,
		pageSize,
		isArchive,
	};

	const responseBody: { data: RES.ILearningResponse } = yield call(
		service.get,
		"/learnings",
		requestData
	);

	yield put<ACT.ILearningInitializeAction>({
		type: ACT.LEARNING_INITIALIZE,
		learnings: responseBody.data,
	});

	yield put<ACT.ILearningBranchLoadingAction>({
		type: ACT.LEARNING_BRANCH_LOADING,
		branch: "running",
		loading: false,
	});
}

function* learningSagas() {
	yield takeEvery(ACT.LEARNING_DID_UPDATE, workerLearningDidUpdate);
}

export default learningSagas;
