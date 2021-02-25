import axios from "axios";
import { TRequest } from "../../interfaces/IRequest";
import { TResponse } from "../../interfaces/IResponse";

import store from "./../../classes/store";

const axiosAsync = (endpoint: string, requestData: TRequest) => {
	const { user } = store.getState();

	return axios.post<TResponse>(user.serviceUrl + endpoint, requestData);
};

export default axiosAsync;
