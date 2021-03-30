import service from "../utils/service";

import { call, put, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/ILearningAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";

function* workerLearningDidMountEvent(action: ACT.ILearningDOMStateAction) {
	yield put<ACT.ILearningMountingAction>({
		type: ACT.LEARNING_DID_MOUNT,
	});
	yield put<ACT.ILearningDOMStateAction>({
		type: ACT.LEARNING_CHECK_LOAD,
		runningScrollTop: action.runningScrollTop,
		runningClientHeight: action.runningClientHeight,
		storingScrollTop: action.storingScrollTop,
		storingClientHeight: action.storingClientHeight,
	});
}

function* workerLearningWillUnmountEvent(action: ACT.ILearningMountingAction) {
	yield put<ACT.ILearningMountingAction>({
		type: ACT.LEARNING_WILL_UNMOUNT,
	});
}

function* workerLearningDidUpdateEvent(action: ACT.ILearningDOMStateAction) {
	const { learning } = store.getState();

	if (
		learning.runningScrollTop === action.runningScrollTop &&
		learning.storingScrollTop === action.storingScrollTop &&
		learning.runningClientHeight === action.runningClientHeight &&
		learning.storingClientHeight === action.storingClientHeight
	)
		return;

	yield put<ACT.ILearningDOMStateAction>({
		type: ACT.LEARNING_CHECK_LOAD,
		runningScrollTop: action.runningScrollTop,
		runningClientHeight: action.runningClientHeight,
		storingScrollTop: action.storingScrollTop,
		storingClientHeight: action.storingClientHeight,
	});
}

function* workerLearningScrollEvent(action: ACT.ILearningDOMStateAction) {
	const { learning } = store.getState();

	if (
		learning.runningScrollTop === action.runningScrollTop &&
		learning.storingScrollTop === action.storingScrollTop &&
		learning.runningClientHeight === action.runningClientHeight &&
		learning.storingClientHeight === action.storingClientHeight
	)
		return;

	yield put<ACT.ILearningDOMStateAction>({
		type: ACT.LEARNING_CHECK_LOAD,
		runningScrollTop: action.runningScrollTop,
		runningClientHeight: action.runningClientHeight,
		storingScrollTop: action.storingScrollTop,
		storingClientHeight: action.storingClientHeight,
	});
}

function* workerLearningCheckLoad(action: ACT.ILearningDOMStateAction) {
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

	if (
		runningScrollTop === action.runningScrollTop &&
		storingScrollTop === action.storingScrollTop &&
		runningClientHeight === action.runningClientHeight &&
		storingClientHeight === action.storingClientHeight
	) {
		return;
	}

	yield put<ACT.ILearningDOMStateAction>({
		type: ACT.LEARNING_SET_DOM_STATE,
		runningScrollTop: action.runningScrollTop,
		runningClientHeight: action.runningClientHeight,
		storingScrollTop: action.storingScrollTop,
		storingClientHeight: action.storingClientHeight,
	});

	const isArchive = true;

	//if (runningLoading && isArchive) return;
	//if (storingLoading && !isArchive) return;

	const rowSize = 30;
	const rowCount = list.length;

	const rowMinStock = 5;

	const pxScrollHeight = rowCount * rowSize;
	const pxHiddenTop = action.runningScrollTop;
	const pxHiddenButtom =
		pxScrollHeight -
		action.runningScrollTop -
		(pxScrollHeight && action.runningClientHeight);

	const rowHiddenTop = Math.trunc(pxHiddenTop / rowSize);
	const rowHiddenButtom = Math.trunc(pxHiddenButtom / rowSize);

	console.log("top: ", rowHiddenTop);
	console.log("rowHiddenButtom: ", rowHiddenButtom);

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

	yield put<ACT.ILearningLoadAction>({
		type: ACT.LEARNING_LOAD,
		learnings: responseBody.data,
	});

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
