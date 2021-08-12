import service from "../utils/service";

import { call, put, takeEvery } from "redux-saga/effects";

import * as ACT from "../actions/IFormAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import { history } from "../../classes/reducers/routerReducer";

import { EmptyGuid } from "../..";
import { IDataItem } from "../../components/Tree/TreeItem";
import {
	doNotificatioErrorOpenEvent,
	doNotificatioSuccessOpenEvent,
} from "../actions/INotificationAction";
import store, { IStore } from "../store";

//import store, { IStore } from "../store";

function* workerFormOnLoadEvent<K extends string, T, F>(
	action: ACT.IFormOnLoadEventAction<K, F>
) {
	const state: IStore = yield call(store.getState);
	const form = state.forms[action.formKey];

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

	const responseBody: {
		data: RES.ITreeResultResponse<T & IDataItem>;
	} = yield call(service.get, form.config.controller, requestData);

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

function* workerFormOnSaveEvent<K extends string, T>(
	action: ACT.IFormOnSaveEventAction<K, T>
) {
	try {
		const state: IStore = yield call(store.getState);
		const form = state.forms[action.formKey];

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

		const isNew = action.values.id === EmptyGuid;

		const saveMethod = isNew ? service.post : service.put;

		const responseBody: {
			data: RES.ITreeResultResponse<T & IDataItem>;
		} = yield call(
			saveMethod,
			form.config.controller,
			requestData,
			action.values
		);

		const Entity = responseBody.data.list[0] as T & IDataItem;

		if (isNew)
			yield put<ACT.IFormOnLoadAction<K, T>>({
				type: ACT.FORM_ON_LOAD,
				formKey: action.formKey,
				values: Entity,
			});

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

		yield call(doNotificatioSuccessOpenEvent, {
			heading: "Success",
			message: "Entity was saved",
		});

		if (isNew) history.push(`/learning/${Entity.id}`);
	} catch (err) {
		yield put<ACT.IFormIsSavingAction<K>>({
			type: ACT.FORM_IS_SAVING,
			formKey: action.formKey,
			saving: false,
		});

		const errors = err.response.data.errors;

		for (const key in errors) {
			const keyLcc = (key.charAt(0) === "$"
				? key.slice(2)
				: key.charAt(0).toLowerCase() + key.slice(1)) as keyof T;

			yield put<ACT.IFormFieldErrorAction<K, T>>({
				type: ACT.FORM_FIELD_ERROR,
				formKey: action.formKey,
				field: keyLcc,
				value: errors[key],
			});
		}

		yield call(doNotificatioErrorOpenEvent, {
			message: "Entity dont saved",
		});
	}
}

function* formsSagas() {
	yield takeEvery("FORM/ON-LOAD-EVENT", workerFormOnLoadEvent);
	yield takeEvery("FORM/ON-SAVE-EVENT", workerFormOnSaveEvent);
}

export default formsSagas;
