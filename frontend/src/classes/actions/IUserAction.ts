export const USER_LOCAL_STORAGE_LOAD = "USER/LOCAL-STORAGE-LOAD";
export const USER_SIGNIN = "USER/USER-SIGNIN";
export const USER_SIGNIN_SUCCESS = "USER/USER-SIGNIN-SUCCESS";
export const USER_SIGNIN_FIELD = "USER/USER-SIGNIN-FIELD";

export interface IUserLocalStorageLoadAction {
	type: typeof USER_LOCAL_STORAGE_LOAD;
	serviceUrl: string;
	serviceJwtToken: string;
}

export interface IUserSignInAction {
	type: typeof USER_SIGNIN;
	login: string;
	password: string;
	rememberMe: boolean;
}

export interface IUserSignInSuccessAction {
	type: typeof USER_SIGNIN_SUCCESS;
	jwtToken: string;
}

export interface IUserSignInFieldAction {
	type: typeof USER_SIGNIN_FIELD;
	error: string;
}

export type TUserAction =
	| IUserLocalStorageLoadAction
	| IUserSignInAction
	| IUserSignInSuccessAction
	| IUserSignInFieldAction;

export default TUserAction;
