export interface ILoginResponse {
	jwtToken: string;
	jwtTokenExpirationTime: number;
	id: string;
}

export type TResponse = ILoginResponse;
