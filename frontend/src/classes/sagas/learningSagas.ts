import service from "../utils/service";

import { call, put, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/ILearningAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";
import { BranchDOMState } from "../reducers/learningReducer";

function branchesEqual(
	runningDOMState: BranchDOMState,
	storingDOMState: BranchDOMState,
	branches: BranchDOMState[]
): boolean {
	const result: BranchDOMState[] = [];

	for (let i = 0; i < branches.length; i++) {
		const item = branches[i];
		if (
			item.branchId === "running" &&
			(runningDOMState.scrollTop !== item.scrollTop ||
				runningDOMState.clientHeight !== item.clientHeight)
		) {
			result.push(item);
		}
		if (
			item.branchId === "storing" &&
			(storingDOMState.scrollTop !== item.scrollTop ||
				storingDOMState.clientHeight !== item.clientHeight)
		) {
			result.push(item);
		}
	}

	return !result.length;
}

function* workerLearningDidMountEvent(action: ACT.ILearningDOMStateAction) {
	yield put<ACT.ILearningMountingAction>({
		type: ACT.LEARNING_DID_MOUNT,
	});
	yield put<ACT.ILearningDOMStateAction>({
		type: ACT.LEARNING_CHECK_LOAD,
		branches: action.branches,
	});
}

function* workerLearningWillUnmountEvent(action: ACT.ILearningMountingAction) {
	yield put<ACT.ILearningMountingAction>({
		type: ACT.LEARNING_WILL_UNMOUNT,
	});
}

function* workerLearningDidUpdateEvent(action: ACT.ILearningDOMStateAction) {
	const { runningDOMState, storingDOMState } = store.getState().learning;

	if (branchesEqual(runningDOMState, storingDOMState, action.branches))
		return;

	yield put<ACT.ILearningDOMStateAction>({
		type: ACT.LEARNING_CHECK_LOAD,
		branches: action.branches,
	});
}

function* workerLearningScrollEvent(action: ACT.ILearningDOMStateAction) {
	const { runningDOMState, storingDOMState } = store.getState().learning;

	if (branchesEqual(runningDOMState, storingDOMState, action.branches))
		return;

	yield put<ACT.ILearningDOMStateAction>({
		type: ACT.LEARNING_CHECK_LOAD,
		branches: action.branches,
	});
}

function* workerLearningCheckLoad(action: ACT.ILearningDOMStateAction) {
	const state = store.getState();

	const {
		list,
		runningStartFrom,
		runningPageSize,
		storingStartFrom,
		storingPageSize,
		runningDOMState,
		storingDOMState,
		runningOpen,
	} = state.learning;

	if (branchesEqual(runningDOMState, storingDOMState, action.branches))
		return;

	yield put<ACT.ILearningDOMStateAction>({
		type: ACT.LEARNING_SET_DOM_STATE,
		branches: action.branches,
	});

	const isArchive = true;

	if (!runningOpen) return;

	/*let scrollTop = 0;
	let clientHeight = 0;

	for (let i = 0; i < action.branches.length; i++) {
		const item = action.branches[i];
		if (item.branchId === "running") {
			scrollTop = item.scrollTop;
			clientHeight = item.clientHeight;
		}
	}

	const toDown = runningDOMState.scrollTop < scrollTop;

	const rowSize = 30;
	const rowCount = list.length;
	const rowMinStock = 5;

	const pxScrollHeight = rowCount * rowSize;
	const pxHiddenTop = scrollTop;
	const pxHiddenButtom =
		pxScrollHeight - scrollTop - (pxScrollHeight && clientHeight);

	const rowHiddenTop = Math.trunc(pxHiddenTop / rowSize);
	const rowHiddenButtom = Math.trunc(pxHiddenButtom / rowSize);

	console.log("top: ", rowHiddenTop);
	console.log("rowHiddenButtom: ", rowHiddenButtom);
	console.log("rowCount: ", rowCount);

	const startFrom = isArchive ? runningStartFrom : storingStartFrom;
	const pageSize = isArchive ? runningPageSize : storingPageSize;

	let newStartFrom = startFrom;
	let newPageSize = pageSize;

	if (toDown) {
		if (rowHiddenButtom <= rowMinStock) {
			if (rowHiddenTop < rowMinStock) {
				newStartFrom = startFrom + 10;
			} else {
				newStartFrom = startFrom + rowHiddenTop;
			}
		} else {
			return;
		}
	} else {
		if (rowHiddenTop <= rowMinStock) {
			newStartFrom = startFrom - 10;
		} else {
			return;
		}
	}

	if (newStartFrom < 0) newStartFrom = 0;*/

	if (list.length) return;

	yield put<ACT.ILearningSetSectionAction>({
		type: ACT.LEARNING_SET_SECTION,
		branch: "running",
		startFrom: runningStartFrom,
		pageSize: runningPageSize,
	});

	yield put<ACT.ILearningBranchLoadingAction>({
		type: ACT.LEARNING_BRANCH_LOADING,
		branch: "running",
		loading: true,
	});

	const requestData: REQ.ILearningRequest = {
		startFrom: runningStartFrom,
		pageSize: runningPageSize,
		isArchive,
	};

	const responseBody: { data: RES.ILearningResponse } = yield call(
		service.get,
		"/learnings",
		requestData
	);

	/*yield put<ACT.ILearningLoadAction>({
		type: ACT.LEARNING_LOAD,
		learnings: responseBody.data,
	});*/

	yield put<ACT.ILearningBranchLoadingAction>({
		type: ACT.LEARNING_BRANCH_LOADING,
		branch: "running",
		loading: false,
	});
}

function* learningSagas() {
	yield takeLatest(ACT.LEARNING_DID_MOUNT_EVENT, workerLearningDidMountEvent);
	yield takeLatest(ACT.LEARNING_CHECK_LOAD, workerLearningCheckLoad);
	yield takeLatest(
		ACT.LEARNING_WILL_UNMOUNT_EVENT,
		workerLearningWillUnmountEvent
	);
	yield takeLatest(
		ACT.LEARNING_DID_UPDATE_EVENT,
		workerLearningDidUpdateEvent
	);
	yield takeLatest(
		ACT.LEARNING_BRANCH_SCROLL_EVENT,
		workerLearningScrollEvent
	);
}

export default learningSagas;
