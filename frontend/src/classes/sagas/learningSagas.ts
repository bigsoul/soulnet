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

	const {
		runningLoading,
		storingLoading,
		runningStartFrom,
		runningPageSize,
		storingStartFrom,
		storingPageSize,
	} = state.learning;

	yield put<ACT.ILearningBranchScrollTopAction>({
		type: ACT.LEARNING_BRANCH_SCROLL_TOP,
		branch: action.branch,
		scrollTop: action.scrollTop,
	});

	if (runningLoading && action.branch === "running") return;
	if (storingLoading && action.branch === "storing") return;

	yield put<ACT.ILearningBranchLoadingAction>({
		type: ACT.LEARNING_BRANCH_LOADING,
		branch: action.branch,
		loading: true,
	});

	const isRunning = action.branch === "running";

	const startFrom = isRunning ? runningStartFrom : storingStartFrom;
	const pageSize = isRunning ? runningPageSize : storingPageSize;
	const isArchive = isRunning ? false : true;

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

function* workerLearningComponentDidUpdate() {
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
	/*yield takeLatest(
		ACT.LEARNING_COMPONENT_DID_MOUNT,
		workerLearningComponentDidMount
	);*/
	yield takeLatest(
		ACT.LEARNING_COMPONENT_DID_UPDATE,
		workerLearningComponentDidUpdate
	);
}

export default learningSagas;
