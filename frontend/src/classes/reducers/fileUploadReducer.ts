import { TFileUploadAction } from "../actions/IFileUploadAction";

export type FileUploaderReducer = {
	file: File;
	chancks: Blob[];
	chunkSize: number;
	totalSize: number;
	totalSended: number;
};

export type FileLoaderReducer<K extends string> =
	| {
			[key in K]: FileUploaderReducer;
	  }
	| {};

const fileUploadReducer = <K extends string>(
	curState: FileLoaderReducer<K> = {},
	action: TFileUploadAction
): FileLoaderReducer<K> => {
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
