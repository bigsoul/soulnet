import _ from "lodash";
import ENotificationStatus from "../../enums/ENotificationStatus";
import INotification from "../../interfaces/INotification";
import TNotificationAction, * as ACT from "../actions/INotificationAction";

export type NotificationReducer = {
	status: ENotificationStatus;
	timeStart: number;
	timeEnd: number;
	heading: string;
	message: string;
	list: INotification[];
};

const preloadedState: NotificationReducer = {
	status: ENotificationStatus.none,
	timeStart: 0,
	timeEnd: 0,
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
			newState.timeStart = action.timeStart;
			newState.timeEnd = action.timeEnd;

			if (!newState.heading) {
				if (action.status === ENotificationStatus.success)
					newState.heading = "Success";
				else if (action.status === ENotificationStatus.error)
					newState.heading = "Error";
			}

			newState.list = [...newState.list, action];

			return newState;
		}
		case ACT.NOTIFICATION_CLOSE: {
			const newState = { ...curState };

			newState.list = _.reject(newState.list, {
				timeStart: action.timeStart,
			});

			_.sortBy(newState.list, "timeStart");

			if (!newState.list.length) {
				newState.status = ENotificationStatus.none;
				newState.timeStart = 0;
				newState.timeEnd = 0;
				newState.heading = "";
				newState.message = "";
			} else {
				const item = newState.list[newState.list.length - 1];

				newState.status = item.status;
				newState.timeStart = item.timeStart;
				newState.timeEnd = item.timeEnd;
				newState.heading =
					item.heading === undefined ? "" : item.heading;
				newState.message = item.message;

				if (!newState.heading) {
					if (item.status === ENotificationStatus.success)
						newState.heading = "Success";
					else if (item.status === ENotificationStatus.error)
						newState.heading = "Error";
				}
			}

			return newState;
		}
		default:
			return curState;
	}
};

export default notificationReducer;
