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
	timeEnd: number;
	heading?: string;
	message: string;
}

export interface INotificationCloseAction {
	type: typeof NOTIFICATION_CLOSE;
	timeStart: number;
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

export const doNotificatioOpen = (
	payload: Omit<INotificationOpenAction, "type">
) => {
	store.dispatch<INotificationOpenAction>({
		type: NOTIFICATION_OPEN,
		timeStart: payload.timeStart,
		timeEnd: payload.timeEnd,
		status: payload.status,
		heading: payload.heading,
		message: payload.message,
	});
};

export const doNotificatioClose = (
	payload: Omit<INotificationCloseAction, "type">
) => {
	store.dispatch<INotificationCloseAction>({
		type: NOTIFICATION_CLOSE,
		timeStart: payload.timeStart,
	});
};

export default TNotificationAction;
