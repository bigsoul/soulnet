import ENotificationStatus from "../../enums/ENotificationStatus";
import INotification from "../../interfaces/INotification";
import TNotificationAction, * as ACT from "../actions/INotificationAction";

export type NotificationReducer = {
	status: ENotificationStatus;
	timeStart: number;
	heading: string;
	message: string;
	list: INotification[];
};

const preloadedState: NotificationReducer = {
	status: ENotificationStatus.none,
	timeStart: 0,
	heading: "",
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
			newState.status = action.status;
			newState.heading =
				action.heading === undefined ? "" : action.heading;
			newState.message = action.message;

			if (!newState.heading) {
				if (action.status === ENotificationStatus.success)
					newState.heading = "Success";
				else if (action.status === ENotificationStatus.error)
					newState.heading = "Error";
			}

			return newState;
		}
		case ACT.NOTIFICATION_CLOSE: {
			const newState = { ...curState };
			newState.status = ENotificationStatus.none;
			newState.heading = "";
			newState.message = "";
			return newState;
		}
		default:
			return curState;
	}
};

export default notificationReducer;
