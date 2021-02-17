import IUser from "../../interfaces/IUser";
import TUserAction, { USER_LOCAL_STORAGE_LOAD } from "../actions/IUserAction";

const preloadedState: IUser = {
	serviceUrl: "",
	serviceLogin: "",
	servicePassword: "",
	serviceJwtToken: "",
};

const userReducer = (
	curState: IUser = preloadedState,
	action: TUserAction
): IUser => {
	switch (action.type) {
		case USER_LOCAL_STORAGE_LOAD: {
			return {
				...curState,
				serviceUrl: action.serviceUrl,
				serviceJwtToken: action.serviceJwtToken,
			};
		}
		default:
			return curState;
	}
};

export default userReducer;
