import { Verbs } from './constants';

const apiHostUrl = `${process.env.REACT_APP_API_URL}/api`;

const commonHeader = {
	'Content-Type': 'application/json',
};

const getRequest: RequestInit = {
	headers: commonHeader,
	method: Verbs.GET,
};

const putRequest: RequestInit = {
	headers: commonHeader,
	mode: 'cors',
	method: Verbs.PUT,
};

const postRequest: RequestInit = {
	headers: commonHeader,
	mode: 'cors',
	method: Verbs.POST,
};

const jsonRequest = {
	common: commonHeader,
	get: getRequest,
	put: putRequest,
	post: postRequest,
};

const request = {
	json: jsonRequest,
};

const config = {
	apiHostUrl,
};

export { config, request };
