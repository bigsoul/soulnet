import ENotificationStatus from "../../enums/ENotificationStatus";
import store from "../store";

export const NOTIFICATION_OPEN = "NOTIFICATION/OPEN";
export const NOTIFICATION_CLOSE = "NOTIFICATION/CLOSE";

export const NOTIFICATION_OPEN_EVENT = "NOTIFICATION/OPEN-EVENT";

export interface INotificationOpenEventAction {
	type: typeof NOTIFICATION_OPEN_EVENT;
	status: ENotificationStatus;
	heading?: string;
	message: string;
}

export interface INotificationOpenAction {
	type: typeof NOTIFICATION_OPEN;
	status: ENotificationStatus;
	timeStart: number;
	heading?: string;
	message: string;
}

export interface INotificationCloseAction {
	type: typeof NOTIFICATION_CLOSE;
	heading?: string;
	message: string;
}

export type TNotificationAction =
	| INotificationOpenEventAction
	| INotificationOpenAction
	| INotificationCloseAction;

type NotificatioOpenEvent = Pick<
	INotificationOpenEventAction,
	Exclude<
		keyof INotificationOpenEventAction,
		keyof { type: string; status: ENotificationStatus }
	>
>;

type NotificatioOpen = Pick<
	INotificationOpenAction,
	Exclude<
		keyof INotificationOpenAction,
		keyof { type: string; status: ENotificationStatus }
	>
>;

export const doNotificatioSuccessOpenEvent = (
	payload: NotificatioOpenEvent
) => {
	store.dispatch<INotificationOpenEventAction>({
		type: NOTIFICATION_OPEN_EVENT,
		status: ENotificationStatus.success,
		heading: payload.heading,
		message: payload.message,
	});
};

export const doNotificatioErrorOpenEvent = (payload: NotificatioOpenEvent) => {
	store.dispatch<INotificationOpenEventAction>({
		type: NOTIFICATION_OPEN_EVENT,
		status: ENotificationStatus.error,
		heading: payload.heading,
		message: payload.message,
	});
};

export const doNotificatioErrorOpen = (payload: NotificatioOpen) => {
	store.dispatch<INotificationOpenAction>({
		type: NOTIFICATION_OPEN,
		timeStart: payload.timeStart,
		status: ENotificationStatus.error,
		heading: payload.heading,
		message: payload.message,
	});
};

export const doNotificatioSuccessOpen = (payload: NotificatioOpen) => {
	store.dispatch<INotificationOpenAction>({
		type: NOTIFICATION_OPEN,
		timeStart: payload.timeStart,
		status: ENotificationStatus.success,
		heading: payload.heading,
		message: payload.message,
	});
};

export const doNotificatioClose = (
	payload: Omit<INotificationCloseAction, "type">
) => {
	store.dispatch<INotificationCloseAction>({
		type: NOTIFICATION_CLOSE,
		heading: payload.heading,
		message: payload.message,
	});
};

export default TNotificationAction;
