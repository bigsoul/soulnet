export interface ISignInRequest {
	username: string;
	password: string;
}

export interface ISignUpRequest {
	username: string;
	email: string;
	password: string;
}

export type TRequest = ISignInRequest | ISignUpRequest;
