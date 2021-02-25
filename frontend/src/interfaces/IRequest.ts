export interface ISignInRequest {
	login: string;
	password: string;
}

export interface ISignUpRequest {
	login: string;
	email: string;
	password: string;
}

export type TRequest = ISignInRequest | ISignUpRequest;
