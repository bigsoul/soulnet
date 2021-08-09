import INotification from "../../interfaces/INotification";
import TNotificationAction, * as ACT from "../actions/INotificationAction";

export type NotificationReducer = {
	heading?: string;
	message: string;
	list: INotification[];
};

const preloadedState: NotificationReducer = {
	message: "",
	list: [],
};

const notificationReducer = (
	curState: NotificationReducer = preloadedState,
	action: TNotificationAction
): NotificationReducer => {
	switch (action.type) {
		case ACT.NOTIFICATION_OPEN: {
			const newState = { ...curState };
			newState.heading = action.heading;
			newState.message = action.message;
			return newState;
		}
		case ACT.NOTIFICATION_CLOSE: {
			const newState = { ...curState };
			newState.heading = undefined;
			newState.message = "";
			return newState;
		}
		default:
			return curState;
	}
};

export default notificationReducer;
