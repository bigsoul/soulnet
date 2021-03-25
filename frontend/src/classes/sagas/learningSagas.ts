import service from "../utils/service";

import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/ILearningAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";

function* workerLearningBranchScrollTopChange(
	action: ACT.ILearningBranchScrollTopChangeAction
) {
	const state = store.getState();

	yield put<ACT.ILearningBranchScrollTopAction>({
		type: ACT.LEARNING_BRANCH_SCROLL_TOP,
		branch: action.branch,
		scrollTop: action.scrollTop,
	});

	const {
		runningLoading,
		storingLoading,
		runningStartFrom,
		runningPageSize,
		storingStartFrom,
		storingPageSize,
	} = state.learning;

	if (runningLoading && action.branch === "running") return;
	if (storingLoading && action.branch === "storing") return;

	yield put<ACT.ILearningBranchLoadingAction>({
		type: ACT.LEARNING_BRANCH_LOADING,
		branch: action.branch,
		loading: true,
	});

	const requestData: REQ.ILearningRequest = {
		startFrom:
			action.branch === "running" ? runningStartFrom : storingStartFrom,
		pageSize:
			action.branch === "running" ? runningPageSize : storingPageSize,
		isArchive: action.branch === "running" ? false : true,
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
		branch: action.branch,
		loading: false,
	});
}

function* workerLearningComponentDidMount() {
	const state = store.getState();

	if (!state.learning.list.length) {
		yield put<ACT.ILearningBranchScrollTopChangeAction>({
			type: ACT.LEARNING_BRANCH_SCROLL_TOP_CHANGE,
			branch: "running",
			scrollTop: 0,
		});
		yield put<ACT.ILearningBranchScrollTopChangeAction>({
			type: ACT.LEARNING_BRANCH_SCROLL_TOP_CHANGE,
			branch: "storing",
			scrollTop: 0,
		});
	}
}

function* learningSagas() {
	yield takeEvery(
		ACT.LEARNING_BRANCH_SCROLL_TOP_CHANGE,
		workerLearningBranchScrollTopChange
	);
	yield takeLatest(
		ACT.LEARNING_COMPONENT_DID_MOUNT,
		workerLearningComponentDidMount
	);
}

export default learningSagas;
