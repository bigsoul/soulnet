import IUser from "../../interfaces/IUser";
import TUserAction, {
	USER_ENVIROMENT_LOAD,
	USER_LOCAL_STORAGE_LOAD,
	USER_SIGNIN_FIELD,
	USER_SIGNIN_SUCCESS,
} from "../actions/IUserAction";

const preloadedState: IUser = {
	serviceUrl: "",
	serviceJwtToken: "",
	serviceJwtTokenExpirationTime: 0,
	id: "",
	login: "",
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
				id: action.id,
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
		case USER_SIGNIN_SUCCESS: {
			return {
				...curState,
				serviceJwtToken: action.jwtToken,
				serviceJwtTokenExpirationTime: action.jwtTokenExpirationTime,
				id: action.id,
				login: action.login,
				isAuth: true,
			};
		}
		case USER_SIGNIN_FIELD: {
			return {
				...curState,
				serviceJwtToken: "",
				serviceJwtTokenExpirationTime: 0,
				id: "",
				login: "",
				isAuth: false,
			};
		}
		default:
			return curState;
	}
};

export default userReducer;
