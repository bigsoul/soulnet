import TFormAction from "../actions/IFormAction";

type FormReducer<K extends string, T> = {
	[key in K]: T;
};

const formsReducer = <K extends string, T>(
	curState: FormReducer<K, T> = ({} as unknown) as FormReducer<K, T>,
	action: TFormAction<K, T>
): FormReducer<K, T> => {
	switch (action.type) {
		case "FORM/INITIALIZE": {
			const newState = { ...curState };
			newState[action.formKey] = action.values;
			return newState;
		}
		case "FORM/CHANGE": {
			const newState = { ...curState };
			newState[action.formKey] = { ...newState[action.formKey] };
			newState[action.formKey][action.field] = action.value;
			return newState;
		}
		default:
			return curState;
	}
};

export default formsReducer;
