import INotification from "../../interfaces/INotification";
import TNotificationAction, * as ACT from "../actions/INotificationAction";

export type NotificationReducer = {
	list: INotification[];
};

const preloadedState: NotificationReducer = {
	list: [],
};

const notificationReducer = (
	curState: NotificationReducer = preloadedState,
	action: TNotificationAction
): NotificationReducer => {
	switch (action.type) {
		case ACT.NOTIFICATION_OPEN: {
			return curState;
		}
		case ACT.NOTIFICATION_CLOSE: {
			return curState;
		}
		default:
			return curState;
	}
};

export default notificationReducer;
