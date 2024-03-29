import { TRequest } from "./IRequest";

export interface IAuthDataResponse {
	jwtToken: string;
	jwtTokenExpirationTime: number;
	id: string;
}

export interface ITreeResultResponse<T> {
	dataOffset: number;
	dataLimit: number;
	list: T[];
}

// standart response

export interface IBadRequest<T> {
	type: string;
	title: string;
	status: string;
	traceId: string;
	errors: {
		[P in keyof T]: string[];
	};
}

export interface IInternalServerError {
	error: string;
}

export type TResponse =
	| IAuthDataResponse
	| IBadRequest<TRequest>
	| IInternalServerError;
