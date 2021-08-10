import ENotificationStatus from "../enums/ENotificationStatus";

export interface INotification {
	status: ENotificationStatus;
	heading?: string;
	message: string;
	timeStart: number;
	timeEnd: number;
}

export default INotification;
