import IUser from "../../interfaces/IUser";
import TUserAction, * as Act from "../actions/IUserAction";

const preloadedState: IUser = {
	serviceUrl: "",
	serviceJwtToken: "",
	serviceJwtTokenExpirationTime: 0,
	id: "",
	username: "",
	isAuth: false,
};

const userReducer = (
	curState: IUser = preloadedState,
	action: TUserAction
): IUser => {
	switch (action.type) {
		case Act.USER_LOCAL_STORAGE_LOAD: {
			return {
				...curState,
				id: action.id,
				serviceJwtToken: action.serviceJwtToken,
				serviceJwtTokenExpirationTime:
					action.serviceJwtTokenExpirationTime,
				isAuth: !!action.serviceJwtToken,
			};
		}
		case Act.USER_ENVIROMENT_LOAD: {
			return {
				...curState,
				serviceUrl: action.serviceUrl,
			};
		}
		case Act.USER_SIGN_SUCCESS: {
			return {
				...curState,
				serviceJwtToken: action.jwtToken,
				serviceJwtTokenExpirationTime: action.jwtTokenExpirationTime,
				id: action.id,
				username: action.username,
				isAuth: !!action.jwtToken,
			};
		}
		case Act.USER_SIGN_FIELD: {
			return {
				...curState,
				serviceJwtToken: "",
				serviceJwtTokenExpirationTime: 0,
				id: "",
				username: "",
				isAuth: false,
			};
		}
		default:
			return curState;
	}
};

export default userReducer;
