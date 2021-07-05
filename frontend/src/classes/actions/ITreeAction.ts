import store from "../store";

export const TREE_ON_LOAD = "TREE/ON-LOAD";
export const TREE_ON_SCROLL = "TREE/ON-SCROLL";
export const TREE_IS_LOADING = "TREE/IS-LOADING";
export const TREE_IS_VISIBLE = "TREE/IS-VISIBLE";

export const TREE_ON_LOAD_EVENT = "TREE/ON-LOAD-EVENT";

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
	list: T[];
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

export type TTreeAction<K, T, F> =
	| ITreeOnLoadEventAction<K, F>
	| ITreeOnLoadAction<K, T>
	| ITreeOnScrollAction<K>
	| ITreeIsLoadingAction<K>
	| ITreeIsVisibleAction<K>;

export const doTreeOnLoadEvent = <K, F>(
	payload: Omit<ITreeOnLoadEventAction<K, F>, "type">
) => {
	store.dispatch({
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
	store.dispatch({
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
	store.dispatch({
		type: TREE_ON_SCROLL,
		listKey: payload.listKey,
		scrollOffset: payload.scrollOffset,
	});
};

export const doTreeIsLoading = <K>(
	payload: Omit<ITreeIsLoadingAction<K>, "type">
) => {
	store.dispatch({
		type: TREE_IS_LOADING,
		listKey: payload.listKey,
		loading: payload.loading,
	});
};

export const doTreeIsVisible = <K>(
	payload: Omit<ITreeIsVisibleAction<K>, "type">
) => {
	store.dispatch({
		type: TREE_IS_VISIBLE,
		listKey: payload.listKey,
		visible: payload.visible,
	});
};

export default TTreeAction;
