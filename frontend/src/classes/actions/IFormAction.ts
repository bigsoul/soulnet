import store from "../store";

export const FORM_INITIALIZE = "FORM/INITIALIZE";
export const FORM_CHANGE = "FORM/CHANGE";

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

export type TFormAction<K, T> =
	| IFormInitializeAction<K, T>
	| IFormChangeAction<K, T>;

export const doInitialize = <K, T>(
	payload: Omit<IFormInitializeAction<K, T>, "type">
) => {
	store.dispatch({
		type: FORM_INITIALIZE,
		formKey: payload.formKey,
		values: payload.values,
	});
};

export const doChange = <K, T>(
	payload: Omit<IFormChangeAction<K, T>, "type">
) => {
	store.dispatch({
		type: FORM_CHANGE,
		formKey: payload.formKey,
		field: payload.field,
		value: payload.value,
	});
};

export default TFormAction;
