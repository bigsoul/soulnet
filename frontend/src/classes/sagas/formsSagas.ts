import service from "../utils/service";

import { call, put, takeEvery } from "redux-saga/effects";

import * as ACT from "../actions/IFormAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

//import store, { IStore } from "../store";

function* workerFormOnLoadEvent<K extends string, T, F>(
	action: ACT.IFormOnLoadEventAction<K, F>
) {
	//const state: IStore = yield call(store.getState);

	//const { forms } = state;

	//if (forms[action.formKey].isLoading) return;

	const requestData: REQ.ITreeRequest = {
		dataOffset: 0,
		dataLimit: 1,
		filter: action.filter,
	};

	yield put<ACT.IFormIsLoadedAction<K>>({
		type: ACT.FORM_IS_LOADED,
		formKey: action.formKey,
		loaded: false,
	});

	yield put<ACT.IFormIsLoadingAction<K>>({
		type: ACT.FORM_IS_LOADING,
		formKey: action.formKey,
		loading: true,
	});

	const responseBody: { data: RES.ITreeResultResponse } = yield call(
		service.get,
		action.controller,
		requestData
	);

	yield put<ACT.IFormOnLoadAction<K, T>>({
		type: ACT.FORM_ON_LOAD,
		formKey: action.formKey,
		values: responseBody.data.list[0],
	});

	yield put<ACT.IFormIsLoadingAction<K>>({
		type: ACT.FORM_IS_LOADING,
		formKey: action.formKey,
		loading: false,
	});

	yield put<ACT.IFormIsLoadedAction<K>>({
		type: ACT.FORM_IS_LOADED,
		formKey: action.formKey,
		loaded: true,
	});
}

function* workerFormOnSaveEvent<K, T>(
	action: ACT.IFormOnSaveEventAction<K, T>
) {
	const requestData: REQ.ITreeRequest = {
		dataOffset: 0,
		dataLimit: 1,
		filter: {},
	};

	yield put<ACT.IFormIsSavedAction<K>>({
		type: ACT.FORM_IS_SAVED,
		formKey: action.formKey,
		saved: false,
	});

	yield put<ACT.IFormIsSavingAction<K>>({
		type: ACT.FORM_IS_SAVING,
		formKey: action.formKey,
		saving: true,
	});

	yield call(service.put, action.controller, requestData, action.values);

	yield put<ACT.IFormIsSavingAction<K>>({
		type: ACT.FORM_IS_SAVING,
		formKey: action.formKey,
		saving: false,
	});

	yield put<ACT.IFormIsSavedAction<K>>({
		type: ACT.FORM_IS_SAVED,
		formKey: action.formKey,
		saved: true,
	});
}

function* formsSagas() {
	yield takeEvery("FORM/ON-LOAD-EVENT", workerFormOnLoadEvent);
	yield takeEvery("FORM/ON-SAVE-EVENT", workerFormOnSaveEvent);
}

export default formsSagas;
