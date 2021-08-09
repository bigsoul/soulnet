import store from "../store";

export const NOTIFICATION_OPEN = "NOTIFICATION/OPEN";
export const NOTIFICATION_CLOSE = "NOTIFICATION/CLOSE";

export interface INotificationOpenAction {
	type: typeof NOTIFICATION_OPEN;
	heading?: string;
	message: string;
}

export interface INotificationCloseAction {
	type: typeof NOTIFICATION_CLOSE;
	heading?: string;
	message: string;
}

export type TNotificationAction =
	| INotificationOpenAction
	| INotificationCloseAction;

export const doNotificatioOpen = (
	payload: Omit<INotificationOpenAction, "type">
) => {
	store.dispatch<INotificationOpenAction>({
		type: NOTIFICATION_OPEN,
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
