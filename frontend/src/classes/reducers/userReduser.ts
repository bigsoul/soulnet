import IUser from "../../interfaces/IUser";
import TUserAction, {
	USER_ENVIROMENT_LOAD,
	USER_LOCAL_STORAGE_LOAD,
} from "../actions/IUserAction";

const preloadedState: IUser = {
	serviceUrl: "",
	serviceLogin: "",
	servicePassword: "",
	serviceRememberMe: false,
	serviceJwtToken: "",
	serviceJwtTokenExpirationTime: 0,
	id: "",
	isAuth: false,
};

const userReducer = (
	curState: IUser = preloadedState,
	action: TUserAction
): IUser => {
	switch (action.type) {
		case USER_LOCAL_STORAGE_LOAD: {
			return {
				...curState,
				serviceJwtToken: action.serviceJwtToken,
				serviceJwtTokenExpirationTime:
					action.serviceJwtTokenExpirationTime,
			};
		}
		case USER_ENVIROMENT_LOAD: {
			return {
				...curState,
				serviceUrl: action.serviceUrl,
			};
		}
		default:
			return curState;
	}
};

export default userReducer;
