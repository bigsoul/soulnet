import { IDataItem } from "../../components/Tree/TreeItem";
import store from "../store";

export const FORM_INITIALIZE = "FORM/INITIALIZE";
export const FORM_ON_LOAD = "FORM/ON-LOAD";
export const FORM_CHANGE = "FORM/CHANGE";
export const FORM_IS_LOADING = "FORM/IS-LOADING";
export const FORM_IS_LOADED = "FORM/IS-LOADED";
export const FORM_IS_SAVING = "FORM/IS-SAVING";
export const FORM_IS_SAVED = "FORM/IS-SAVED";

export const FORM_ON_LOAD_EVENT = "FORM/ON-LOAD-EVENT";
export const FORM_ON_SAVE_EVENT = "FORM/ON-SAVE-EVENT";

export interface IFormInitializeAction<K, T> {
	type: typeof FORM_INITIALIZE;
	formKey: K;
	values: T;
	loading?: boolean;
	loaded?: boolean;
	saving?: boolean;
	saved?: boolean;
}

export interface IFormChangeAction<K, T> {
	type: typeof FORM_CHANGE;
	formKey: K;
	field: keyof T;
	value: T[keyof T];
}

export interface IFormOnLoadEventAction<K, F> {
	type: typeof FORM_ON_LOAD_EVENT;
	formKey: K;
	filter: F;
	controller: string;
}

export interface IFormOnSaveEventAction<K, T> {
	type: typeof FORM_ON_SAVE_EVENT;
	formKey: K;
	values: T & IDataItem;
	controller: string;
}

export interface IFormOnLoadAction<K, T> {
	type: typeof FORM_ON_LOAD;
	formKey: K;
	values: T & IDataItem;
}

export interface IFormIsLoadingAction<K> {
	type: typeof FORM_IS_LOADING;
	formKey: K;
	loading: boolean;
}

export interface IFormIsLoadedAction<K> {
	type: typeof FORM_IS_LOADED;
	formKey: K;
	loaded: boolean;
}

export interface IFormIsSavingAction<K> {
	type: typeof FORM_IS_SAVING;
	formKey: K;
	saving: boolean;
}

export interface IFormIsSavedAction<K> {
	type: typeof FORM_IS_SAVED;
	formKey: K;
	saved: boolean;
}

export type TFormAction<K, T, F> =
	| IFormInitializeAction<K, T>
	| IFormChangeAction<K, T>
	| IFormOnLoadEventAction<K, F>
	| IFormOnLoadAction<K, T>
	| IFormIsLoadingAction<K>
	| IFormIsLoadedAction<K>
	| IFormOnSaveEventAction<K, T>
	| IFormIsSavingAction<K>
	| IFormIsSavedAction<K>;

export const doInitialize = <K, T>(
	payload: Omit<IFormInitializeAction<K, T>, "type">
) => {
	store.dispatch<IFormInitializeAction<K, T>>({
		type: FORM_INITIALIZE,
		formKey: payload.formKey,
		values: payload.values,
		loading: payload.loading,
		loaded: payload.loaded,
		saving: payload.saving,
		saved: payload.saved,
	});
};

export const doChange = <K, T>(
	payload: Omit<IFormChangeAction<K, T>, "type">
) => {
	store.dispatch<IFormChangeAction<K, T>>({
		type: FORM_CHANGE,
		formKey: payload.formKey,
		field: payload.field,
		value: payload.value,
	});
};

export const doFormOnLoadEvent = <K, F>(
	payload: Omit<IFormOnLoadEventAction<K, F>, "type">
) => {
	store.dispatch<IFormOnLoadEventAction<K, F>>({
		type: FORM_ON_LOAD_EVENT,
		formKey: payload.formKey,
		filter: payload.filter,
		controller: payload.controller,
	});
};

export const doFormOnSaveEvent = <K, T>(
	payload: Omit<IFormOnSaveEventAction<K, T>, "type">
) => {
	store.dispatch<IFormOnSaveEventAction<K, T>>({
		type: FORM_ON_SAVE_EVENT,
		formKey: payload.formKey,
		values: payload.values,
		controller: payload.controller,
	});
};

export const doFormOnLoad = <K, T>(
	payload: Omit<IFormOnLoadAction<K, T>, "type">
) => {
	store.dispatch<IFormOnLoadAction<K, T>>({
		type: FORM_ON_LOAD,
		formKey: payload.formKey,
		values: payload.values,
	});
};

export const doFormIsLoading = <K>(
	payload: Omit<IFormIsLoadingAction<K>, "type">
) => {
	store.dispatch<IFormIsLoadingAction<K>>({
		type: FORM_IS_LOADING,
		formKey: payload.formKey,
		loading: payload.loading,
	});
};

export const doFormIsLoaded = <K>(
	payload: Omit<IFormIsLoadedAction<K>, "type">
) => {
	store.dispatch<IFormIsLoadedAction<K>>({
		type: FORM_IS_LOADED,
		formKey: payload.formKey,
		loaded: payload.loaded,
	});
};

export const doFormIsSaving = <K>(
	payload: Omit<IFormIsSavingAction<K>, "type">
) => {
	store.dispatch<IFormIsSavingAction<K>>({
		type: FORM_IS_SAVING,
		formKey: payload.formKey,
		saving: payload.saving,
	});
};

export const doFormIsSaved = <K>(
	payload: Omit<IFormIsSavedAction<K>, "type">
) => {
	store.dispatch<IFormIsSavedAction<K>>({
		type: FORM_IS_SAVED,
		formKey: payload.formKey,
		saved: payload.saved,
	});
};

export default TFormAction;
