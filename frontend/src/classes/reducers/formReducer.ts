import { IDataItem } from "../../components/Tree/TreeItem";
import TFormAction from "../actions/IFormAction";

export type FieldErrors<T> = {
	[key in keyof T]?: string[];
};

export type FormReducer<T> = {
	initialValues: T;
	values: T & IDataItem;
	errors: FieldErrors<T>;
	isMutated: boolean;
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
				initialValues: {
					...action.values,
					id: action.values.id
						? action.values.id
						: "00000000-0000-0000-0000-000000000000",
				},
				values: {
					...action.values,
					id: action.values.id
						? action.values.id
						: "00000000-0000-0000-0000-000000000000",
				},
				errors: {}, // ({ ...action.values } as unknown) as FieldErrors<T>
				isMutated: false,
				isLoading: !!action.loading,
				isLoaded: !!action.loaded,
				isSaving: !!action.saving,
				isSaved: !!action.saved,
			};

			for (const key in newState[action.formKey].errors) {
				newState[action.formKey].errors[key] = [];
			}

			return newState;
		}
		case "FORM/CHANGE": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey].values = {
				...newState[action.formKey].values,
				[action.field]: action.value,
			};
			newState[action.formKey].isMutated = true;
			return newState;
		}
		case "FORM/ON-LOAD": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey].values = action.values;
			newState[action.formKey].errors = ({
				...action.values,
			} as unknown) as FieldErrors<T>;

			for (const key in newState[action.formKey].errors) {
				newState[action.formKey].errors[key] = [];
			}

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
			if (action.saved) newState[action.formKey].isMutated = false;
			return newState;
		}
		case "FORM/FIELD-ERROR": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey].errors = {
				...newState[action.formKey].errors,
				[action.field]: action.value,
			};
			return newState;
		}
		default:
			return curState;
	}
};

export default formsReducer;
