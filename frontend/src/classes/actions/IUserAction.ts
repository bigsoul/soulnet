export const USER_LOCAL_STORAGE_LOAD = "USER/LOCAL-STORAGE-LOAD";
export const USER_ENVIROMENT_LOAD = "USER/ENVIROMENT_LOAD";
export const USER_SIGNIN = "USER/USER-SIGNIN";
export const USER_SIGNIN_SUCCESS = "USER/USER-SIGNIN-SUCCESS";
export const USER_SIGNIN_FIELD = "USER/USER-SIGNIN-FIELD";

export interface IUserLocalStorageLoadAction {
	type: typeof USER_LOCAL_STORAGE_LOAD;
	id: string;
	serviceJwtToken: string;
	serviceJwtTokenExpirationTime: number;
}

export interface IUserEnviromentLoadAction {
	type: typeof USER_ENVIROMENT_LOAD;
	serviceUrl: string;
}

export interface IUserSignInAction {
	type: typeof USER_SIGNIN;
	login: string;
	password: string;
	rememberMe: boolean;
}

export interface IUserSignInSuccessAction {
	type: typeof USER_SIGNIN_SUCCESS;
	id: string;
	login: string;
	jwtToken: string;
	jwtTokenExpirationTime: number;
}

export interface IUserSignInFieldAction {
	type: typeof USER_SIGNIN_FIELD;
	error: string;
}

export type TUserAction =
	| IUserLocalStorageLoadAction
	| IUserEnviromentLoadAction
	| IUserSignInAction
	| IUserSignInSuccessAction
	| IUserSignInFieldAction;

export default TUserAction;
