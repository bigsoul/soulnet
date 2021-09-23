import { call, put, takeEvery } from "redux-saga/effects";

import * as GACT from "../actions/IGlobalAction";
import * as TACT from "../actions/ITreeAction";

import store, { IStore } from "../store";

function* workerGlobalClickEvent(action: GACT.IGlobalClickEventAction) {
	const state: IStore = yield call(store.getState);

	for (const key in state.tree) {
		const list = state.tree[key];
		if (list.isSelectMode && list.isVisible && action.detail !== 101)
			yield put<TACT.ITreeIsVisibleAction<typeof key>>({
				type: TACT.TREE_IS_VISIBLE,
				listKey: key,
				visible: false,
			});
	}
}

function* globalSagas() {
	yield takeEvery("GLOBAL/CLICK-EVENT", workerGlobalClickEvent);
}

export default globalSagas;
