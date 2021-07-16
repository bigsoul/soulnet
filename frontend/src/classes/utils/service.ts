import axios from "axios";

import { TRequest } from "../../interfaces/IRequest";
import { TResponse } from "../../interfaces/IResponse";

import store from "../store";

const get = (endpoint: string, requestData: TRequest) => {
	const { user } = store.getState();

	const config = {
		baseURL: user.serviceUrl,
		headers: {
			Authorization: "Bearer " + user.serviceJwtToken,
		},
		params: requestData,
	};

	return axios.get<TResponse>(endpoint, config);
};

const post = (endpoint: string, requestData: TRequest) => {
	const { user } = store.getState();

	return axios.post<TResponse>(user.serviceUrl + endpoint, requestData);
};

const put = <T>(endpoint: string, requestData: TRequest, payload: T) => {
	const { user } = store.getState();

	const config = {
		baseURL: user.serviceUrl,
		headers: {
			Authorization: "Bearer " + user.serviceJwtToken,
		},
		params: requestData,
	};

	return axios.put<TResponse>(user.serviceUrl + endpoint, payload, config);
};

const service = {
	post,
	get,
	put,
};

export default service;
