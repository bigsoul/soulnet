import { TreeListEntity } from "../classes/reducers/treeReducer";
import { TRequest } from "./IRequest";

export interface IAuthDataResponse {
	jwtToken: string;
	jwtTokenExpirationTime: number;
	id: string;
}

export interface ITreeResultResponse {
	list: TreeListEntity[];
	dataOffset: number;
	dataLimit: number;
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
