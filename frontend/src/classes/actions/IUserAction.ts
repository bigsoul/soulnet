export const USER_LOCAL_STORAGE_LOAD = "USER/LOCAL-STORAGE-LOAD";
export const USER_ENVIROMENT_LOAD = "USER/ENVIROMENT-LOAD";
export const USER_SIGNIN = "USER/SIGNIN";
export const USER_SIGNUP = "USER/SIGNUP";
export const USER_SIGN_SUCCESS = "USER/SIGN-SUCCESS";
export const USER_SIGN_FIELD = "USER/SIGN-FIELD";
export const USER_SIGNOUT = "USER/SIGNOUT";

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
	username: string;
	password: string;
	rememberMe: boolean;
}

export interface IUserSignOutAction {
	type: typeof USER_SIGNOUT;
}

export interface IUserSignUpAction {
	type: typeof USER_SIGNUP;
	username: string;
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface IUserSignSuccessAction {
	type: typeof USER_SIGN_SUCCESS;
	id: string;
	username: string;
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
