import { IDataItem } from "../../components/Tree/TreeItem";
import store from "../store";

export const FORM_INITIALIZE = "FORM/INITIALIZE";
export const FORM_ON_LOAD = "FORM/ON-LOAD";
export const FORM_CHANGE = "FORM/CHANGE";

export const FORM_ON_LOAD_EVENT = "FORM/ON-LOAD-EVENT";

export interface IFormInitializeAction<K, T> {
	type: typeof FORM_INITIALIZE;
	formKey: K;
	values: T;
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

export interface IFormOnLoadAction<K, T> {
	type: typeof FORM_ON_LOAD;
	listKey: K;
	values: (T & IDataItem)[];
}

export type TFormAction<K, T, F> =
	| IFormInitializeAction<K, T>
	| IFormChangeAction<K, T>
	| IFormOnLoadEventAction<K, F>
	| IFormOnLoadAction<K, T>;

export const doInitialize = <K, T>(
	payload: Omit<IFormInitializeAction<K, T>, "type">
) => {
	store.dispatch<IFormInitializeAction<K, T>>({
		type: FORM_INITIALIZE,
		formKey: payload.formKey,
		values: payload.values,
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

export const doFormOnLoad = <K, T>(
	payload: Omit<IFormOnLoadAction<K, T>, "type">
) => {
	store.dispatch<IFormOnLoadAction<K, T>>({
		type: FORM_ON_LOAD,
		listKey: payload.listKey,
		values: payload.values,
	});
};

export default TFormAction;
