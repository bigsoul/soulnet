import store from "../store";

export const FILE_UPLOAD_START = "FILE-UPLOAD/START";
export const FILE_UPLOAD_PAUSE = "FILE-UPLOAD/PAUSE";
export const FILE_UPLOAD_STOP = "FILE-UPLOAD/STOP";

export const FILE_UPLOAD_SELECTED_EVENT = "FILE-UPLOAD/SELECTED-EVENT";
export const FILE_UPLOAD_STOP_EVENT = "FILE-UPLOAD/STOP-EVENT";

export interface IFileUploadStartAction {
	type: typeof FILE_UPLOAD_START;
}

export interface IFileUploadPauseAction {
	type: typeof FILE_UPLOAD_PAUSE;
}

export interface IFileUploadStopAction {
	type: typeof FILE_UPLOAD_STOP;
}

export interface IFileUploadSelectedEventAction {
	type: typeof FILE_UPLOAD_SELECTED_EVENT;
	file: File;
}

export interface IFileUploadStopEventAction {
	type: typeof FILE_UPLOAD_STOP_EVENT;
}

export type TFileUploadAction =
	| IFileUploadStartAction
	| IFileUploadPauseAction
	| IFileUploadStopAction
	| IFileUploadSelectedEventAction
	| IFileUploadStopEventAction;

export const doFileUploadStart = (
	payload: Omit<IFileUploadStartAction, "type">
) => {
	store.dispatch<IFileUploadStartAction>({
		type: FILE_UPLOAD_START,
	});
};

export const doFileUploadPause = (
	payload: Omit<IFileUploadPauseAction, "type">
) => {
	store.dispatch<IFileUploadPauseAction>({
		type: FILE_UPLOAD_PAUSE,
	});
};

export const doFileUploadStop = (
	payload: Omit<IFileUploadStopAction, "type">
) => {
	store.dispatch<IFileUploadStopAction>({
		type: FILE_UPLOAD_STOP,
	});
};

export const doFileUploadSelectedEvent = (
	payload: Omit<IFileUploadSelectedEventAction, "type">
) => {
	store.dispatch<IFileUploadSelectedEventAction>({
		type: FILE_UPLOAD_SELECTED_EVENT,
		file: payload.file,
	});
};

export const doFileUploadStopEvent = (
	payload: Omit<IFileUploadStopEventAction, "type">
) => {
	store.dispatch<IFileUploadStopEventAction>({
		type: FILE_UPLOAD_STOP_EVENT,
	});
};
