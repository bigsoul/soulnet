import TFormAction from "../actions/IFormAction";

export type FormReducer<T> = {
	initialValues: T;
	values: T;
	isLoading: boolean;
	isLoaded: boolean;
};

type FormsReducer<K extends string, T> = {
	[key in K]: FormReducer<T>;
};

const formsReducer = <K extends string, T, F>(
	curState: FormsReducer<K, T> = ({} as unknown) as FormsReducer<K, T>,
	action: TFormAction<K, T, F>
): FormsReducer<K, T> => {
	switch (action.type) {
		case "FORM/INITIALIZE": {
			const newState = { ...curState };
			newState[action.formKey] = {
				initialValues: action.values,
				values: action.values,
				isLoading: false,
				isLoaded: false,
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
		default:
			return curState;
	}
};

export default formsReducer;
