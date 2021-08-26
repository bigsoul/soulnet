import { TFileUploadAction } from "../actions/IFileUploadAction";

export type FileUploadReducer = {};

const fileUploadReducer = (
	curState: FileUploadReducer = {},
	action: TFileUploadAction
): FileUploadReducer => {
	switch (action.type) {
		case "FILE-UPLOAD/START": {
			return curState;
		}
		case "FILE-UPLOAD/PAUSE": {
			return curState;
		}
		case "FILE-UPLOAD/STOP": {
			return curState;
		}
		default:
			return curState;
	}
};

export default fileUploadReducer;
