import { IDataItem } from "../../components/Tree/TreeItem";
import TFormAction from "../actions/IFormAction";

export type FormReducer<T> = {
	initialValues: T;
	values: T & IDataItem;
	isLoading: boolean;
	isLoaded: boolean;
	isSaving: boolean;
	isSaved: boolean;
};

type FormsReducer<K extends string, T> = {
	[key in K]: FormReducer<T>;
};

const formsReducer = <K extends string, T, F>(
	curState: FormsReducer<K, T> = ({} as unknown) as FormsReducer<K, T>,
	action: TFormAction<K, T & IDataItem, F>
): FormsReducer<K, T> => {
	switch (action.type) {
		case "FORM/INITIALIZE": {
			const newState = { ...curState };
			newState[action.formKey] = {
				initialValues: action.values,
				values: { ...action.values },
				isLoading: !!action.loading,
				isLoaded: !!action.loaded,
				isSaving: !!action.saving,
				isSaved: !!action.saved,
			};
			return newState;
		}
		case "FORM/CHANGE": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey].values = {
				...newState[action.formKey].values,
				[action.field]: action.value,
			};
			return newState;
		}
		case "FORM/ON-LOAD": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey].values = action.values;
			return newState;
		}
		case "FORM/IS-LOADING": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey].isLoading = action.loading;
			return newState;
		}
		case "FORM/IS-LOADED": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey].isLoaded = action.loaded;
			return newState;
		}
		case "FORM/IS-SAVING": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey].isSaving = action.saving;
			return newState;
		}
		case "FORM/IS-SAVED": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey].isSaved = action.saved;
			return newState;
		}
		default:
			return curState;
	}
};

export default formsReducer;
