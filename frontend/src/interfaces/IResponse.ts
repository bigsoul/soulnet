export interface IAuthDataResponse {
	jwtToken: string;
	jwtTokenExpirationTime: number;
	id: string;
}

export type TResponse = IAuthDataResponse;
