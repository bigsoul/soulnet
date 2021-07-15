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

function* formsSagas() {
	yield takeEvery("FORM/ON-LOAD-EVENT", workerFormOnLoadEvent);
}

export default formsSagas;
