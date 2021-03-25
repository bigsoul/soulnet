export interface ISignInRequest {
	username: string;
	password: string;
}

export interface ISignUpRequest {
	username: string;
	email: string;
	password: string;
}

export interface ILearningRequest {
	startFrom: number;
	pageSize: number;
	isArchive: boolean;
}

export type TRequest = ISignInRequest | ISignUpRequest | ILearningRequest;
