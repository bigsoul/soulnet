export const USER_LOCAL_STORAGE_LOAD = "USER/LOCAL-STORAGE-LOAD";
export const USER_ENVIROMENT_LOAD = "USER/ENVIROMENT_LOAD";
export const USER_SIGNIN = "USER/USER-SIGNIN";
export const USER_SIGNUP = "USER/USER-SIGNUP";
export const USER_SIGN_SUCCESS = "USER/USER-SIGN-SUCCESS";
export const USER_SIGN_FIELD = "USER/USER-SIGN-FIELD";
export const USER_SIGNOUT = "USER/USER-SIGNOUT";

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

export interface IUserSignOutAction {
	type: typeof USER_SIGNOUT;
}

export interface IUserSignUpAction {
	type: typeof USER_SIGNUP;
	login: string;
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface IUserSignSuccessAction {
	type: typeof USER_SIGN_SUCCESS;
	id: string;
	login: string;
	jwtToken: string;
	jwtTokenExpirationTime: number;
}

export interface IUserSignFieldAction {
	type: typeof USER_SIGN_FIELD;
	error: string;
}

export type TUserAction =
	| IUserLocalStorageLoadAction
	| IUserEnviromentLoadAction
	| IUserSignInAction
	| IUserSignUpAction
	| IUserSignOutAction
	| IUserSignSuccessAction
	| IUserSignFieldAction;

export default TUserAction;
