import axios from "axios";
import { TRequest } from "../../interfaces/IRequest";
import { TResponse } from "../../interfaces/IResponse";

const serviceUrl = "";
const serviceLogin = "";
const servicePassword = "";

function axiosAsync(endpoint: string, requestData: TRequest) {
	return axios.post<TResponse>(serviceUrl + endpoint, requestData, {
		auth: {
			username: serviceLogin,
			password: servicePassword,
		},
	});
}

export default axiosAsync;
