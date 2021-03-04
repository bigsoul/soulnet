interface IUser {
	serviceUrl: string;
	serviceJwtToken: string;
	serviceJwtTokenExpirationTime: number;
	id: string;
	username: string;
	isAuth: boolean;
}

export default IUser;
