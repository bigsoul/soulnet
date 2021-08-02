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

const post = <T>(endpoint: string, requestData: TRequest, payload?: T) => {
	const { user } = store.getState();

	const config = {
		baseURL: user.serviceUrl,
		headers: {
			Authorization: "Bearer " + user.serviceJwtToken,
		},
		params: requestData,
	};

	return axios.post<TResponse>(user.serviceUrl + endpoint, payload, config);
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

const del = <T>(endpoint: string, requestData: TRequest, payload: T) => {
	const { user } = store.getState();

	const config = {
		baseURL: user.serviceUrl,
		headers: {
			Authorization: "Bearer " + user.serviceJwtToken,
		},
		params: requestData,
	};

	return axios.delete<TResponse>(user.serviceUrl + endpoint, config);
};

const service = {
	post,
	get,
	put,
	delete: del,
};

export default service;
