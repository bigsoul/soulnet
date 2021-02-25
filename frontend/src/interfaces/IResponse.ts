export interface ISignInResponse {
	jwtToken: string;
	jwtTokenExpirationTime: number;
	id: string;
}

export type TResponse = ISignInResponse;
