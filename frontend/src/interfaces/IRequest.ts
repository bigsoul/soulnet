import { TreeListEntityFilters } from "../classes/reducers/treeReducer";

export interface ISignInRequest {
	username: string;
	password: string;
}

export interface ISignUpRequest {
	username: string;
	email: string;
	password: string;
}

export interface ITreeRequest {
	dataOffset: number;
	dataLimit: number;
	filter: TreeListEntityFilters;
}

export type TRequest = ISignInRequest | ISignUpRequest | ITreeRequest;
