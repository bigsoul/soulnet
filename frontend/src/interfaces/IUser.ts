interface IUser {
	serviceUrl: string;
	serviceLogin: string;
	servicePassword: string;
	serviceRememberMe: boolean;
	serviceJwtToken: string;
	serviceJwtTokenExpirationTime: number;
	id: string;
	isAuth: boolean;
}

export default IUser;
