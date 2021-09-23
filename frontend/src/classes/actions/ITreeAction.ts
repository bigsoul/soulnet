import { IDataItemUI } from "../../components/Tree/TreeItem";
import { ITreeListConfig } from "../../components/Tree/TreeList";
import store from "../store";

export const TREE_INITIALIZE = "TREE/INITIALIZE";
export const TREE_ON_LOAD = "TREE/ON-LOAD";
export const TREE_ON_SCROLL = "TREE/ON-SCROLL";
export const TREE_IS_LOADING = "TREE/IS-LOADING";
export const TREE_IS_VISIBLE = "TREE/IS-VISIBLE";
export const TREE_IS_VISIBLE_CONVERT = "TREE/IS-VISIBLE-CONVERT";
export const TREE_ITEM_SELECT = "TREE/ITEM-SELECT";
export const TREE_SET_CURRENT_ROW = "TREE/SET-CURRENT-ROW";
export const TREE_CLEAR_CURRENT_ROWS = "TREE/CLEAR-CURRENT-ROWS";

export const TREE_ON_LOAD_EVENT = "TREE/ON-LOAD-EVENT";
export const TREE_ON_DELETE_EVENT = "TREE/ON-DELETE-EVENT";

export interface ITreeInitializeAction<K> {
	type: typeof TREE_INITIALIZE;
	listKey: K;
	config: ITreeListConfig;
}

export interface ITreeOnLoadEventAction<K, F> {
	type: typeof TREE_ON_LOAD_EVENT;
	listKey: K;
	dataOffset: number;
	dataLimit: number;
	filter: F;
	controller: string;
}

export interface ITreeOnLoadAction<K, T> {
	type: typeof TREE_ON_LOAD;
	list: (T & IDataItemUI)[];
	listKey: K;
	dataOffset: number;
	dataLimit: number;
}

export interface ITreeOnScrollAction<K> {
	type: typeof TREE_ON_SCROLL;
	listKey: K;
	scrollOffset: number;
}

export interface ITreeIsLoadingAction<K> {
	type: typeof TREE_IS_LOADING;
	listKey: K;
	loading: boolean;
}

export interface ITreeIsVisibleAction<K> {
	type: typeof TREE_IS_VISIBLE;
	listKey: K;
	visible: boolean;
}

export interface ITreeIsVisibleConvertAction<K> {
	type: typeof TREE_IS_VISIBLE_CONVERT;
	listKey: K;
}

export interface ITreeItemSelectAction<K> {
	type: typeof TREE_ITEM_SELECT;
	listKey: K;
	id: string;
}

export interface ITreeSetCurrentRowAction<K> {
	type: typeof TREE_SET_CURRENT_ROW;
	listKey: K;
	id: string;
}

export interface ITreeClearCurrentRowsAction<K> {
	type: typeof TREE_CLEAR_CURRENT_ROWS;
	listKey: K;
}

export interface ITreeOnDeleteEventAction<K> {
	type: typeof TREE_ON_DELETE_EVENT;
	listKey: K;
	id: string;
	controller: string;
}

export type TTreeAction<K, T, F> =
	| ITreeOnLoadEventAction<K, F>
	| ITreeOnLoadAction<K, T>
	| ITreeOnScrollAction<K>
	| ITreeIsLoadingAction<K>
	| ITreeIsVisibleAction<K>
	| ITreeIsVisibleConvertAction<K>
	| ITreeItemSelectAction<K>
	| ITreeSetCurrentRowAction<K>
	| ITreeClearCurrentRowsAction<K>
	| ITreeInitializeAction<K>
	| ITreeOnDeleteEventAction<K>;

export const doTreeOnLoadEvent = <K, F>(
	payload: Omit<ITreeOnLoadEventAction<K, F>, "type">
) => {
	store.dispatch<ITreeOnLoadEventAction<K, F>>({
		type: TREE_ON_LOAD_EVENT,
		listKey: payload.listKey,
		dataOffset: payload.dataOffset,
		dataLimit: payload.dataLimit,
		filter: payload.filter,
		controller: payload.controller,
	});
};

export const doTreeOnLoad = <K, T>(
	payload: Omit<ITreeOnLoadAction<K, T>, "type">
) => {
	store.dispatch<ITreeOnLoadAction<K, T>>({
		type: TREE_ON_LOAD,
		list: payload.list,
		listKey: payload.listKey,
		dataOffset: payload.dataOffset,
		dataLimit: payload.dataLimit,
	});
};

export const doTreeOnScroll = <K>(
	payload: Omit<ITreeOnScrollAction<K>, "type">
) => {
	store.dispatch<ITreeOnScrollAction<K>>({
		type: TREE_ON_SCROLL,
		listKey: payload.listKey,
		scrollOffset: payload.scrollOffset,
	});
};

export const doTreeIsLoading = <K>(
	payload: Omit<ITreeIsLoadingAction<K>, "type">
) => {
	store.dispatch<ITreeIsLoadingAction<K>>({
		type: TREE_IS_LOADING,
		listKey: payload.listKey,
		loading: payload.loading,
	});
};

export const doTreeIsVisible = <K>(
	payload: Omit<ITreeIsVisibleAction<K>, "type">
) => {
	store.dispatch<ITreeIsVisibleAction<K>>({
		type: TREE_IS_VISIBLE,
		listKey: payload.listKey,
		visible: payload.visible,
	});
};

export const doTreeIsVisibleConvert = <K>(
	payload: Omit<ITreeIsVisibleConvertAction<K>, "type">
) => {
	store.dispatch<ITreeIsVisibleConvertAction<K>>({
		type: TREE_IS_VISIBLE_CONVERT,
		listKey: payload.listKey,
	});
};

export const doTreeItemSelect = <K>(
	payload: Omit<ITreeItemSelectAction<K>, "type">
) => {
	store.dispatch<ITreeItemSelectAction<K>>({
		type: TREE_ITEM_SELECT,
		listKey: payload.listKey,
		id: payload.id,
	});
};

export const doTreeSetCurrentRow = <K>(
	payload: Omit<ITreeSetCurrentRowAction<K>, "type">
) => {
	store.dispatch<ITreeSetCurrentRowAction<K>>({
		type: TREE_SET_CURRENT_ROW,
		listKey: payload.listKey,
		id: payload.id,
	});
};

export const doTreeClearCurrentRows = <K>(
	payload: Omit<ITreeClearCurrentRowsAction<K>, "type">
) => {
	store.dispatch<ITreeClearCurrentRowsAction<K>>({
		type: TREE_CLEAR_CURRENT_ROWS,
		listKey: payload.listKey,
	});
};

export const doTreeInitialize = <K>(
	payload: Omit<ITreeInitializeAction<K>, "type">
) => {
	store.dispatch<ITreeInitializeAction<K>>({
		type: TREE_INITIALIZE,
		listKey: payload.listKey,
		config: payload.config,
	});
};

export const doTreeOnDeleteEvent = <K>(
	payload: Omit<ITreeOnDeleteEventAction<K>, "type">
) => {
	store.dispatch<ITreeOnDeleteEventAction<K>>({
		type: TREE_ON_DELETE_EVENT,
		listKey: payload.listKey,
		id: payload.id,
		controller: payload.controller,
	});
};

export default TTreeAction;
