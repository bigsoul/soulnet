interface IUser {
	serviceUrl: string;
	serviceJwtToken: string;
	serviceJwtTokenExpirationTime: number;
	id: string;
	login: string;
	isAuth: boolean;
}

export default IUser;
