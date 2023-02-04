import { config, request } from './config';
import { ApiResult } from './Models/Common';
import { LoginRequest, UserToken, ResetRequest,ForgetRequest, MfaRequest } from './Models/AuthenticationApi';

const sessionKey = 'sessionKey';
const errorKey = "errorKey";

const login = async (e: LoginRequest): Promise<ApiResult> => {
	const url = config.apiHostUrl + '/login';
	const options = {
		...request.json.post,
		body: JSON.stringify(e),
	};
	const response = await fetch(url, options);
	// const result = {
	// 	ok: response.ok,
	// };
	const data = await response.json();
	const serialized = JSON.stringify(data);
	if (response.ok) {
		sessionStorage.setItem(sessionKey, serialized);
	} else {
		sessionStorage.setItem(errorKey,serialized );
	}
	return response;
};
const mfa = async (e: MfaRequest): Promise<ApiResult> => {
	const url = config.apiHostUrl + '/login/mfa';
	const options = {
		...request.json.post,
		body:JSON.stringify(e)
	}
	const response = await fetch(url,options);
	console.log(response);
	return response ;
}	
const forgetpassword = async (e: ForgetRequest): Promise<ApiResult> => {
	const url = config.apiHostUrl + '/reset';
	const options = {
		...request.json.post,
		body: JSON.stringify(e),
	};
	const response = await fetch(url, options);
	const result = {
		ok: response.ok,
	};

	if (response.ok) {
		const data = await response.json();
		const serialized = JSON.stringify(data);
		sessionStorage.setItem(sessionKey, serialized);
	}
	return result;
};

const resetpassword = async (e: ResetRequest) : Promise<ApiResult> =>{
	const url = config.apiHostUrl + '/user';
	const options = {
		...request.json.post,
		body: JSON.stringify(e),
	};
	const response = await fetch(url, options);
	const result = {
		ok: response.ok,
	};

	if (response.ok) {
		const data = await response.json();
		const serialized = JSON.stringify(data);
		sessionStorage.setItem(sessionKey, serialized);
	}
	return result;
}

const getToken = (): UserToken => {
	const serialized = sessionStorage.getItem(sessionKey);
	if (serialized) {
		const token: UserToken = JSON.parse(serialized);

		if (!token) {
			throw new Error('Token could not be deserialized!');
		}

		return token;
	}

	throw new Error('Could not find token!');
};

const getBearerToken = (): string => {
	const token = getToken();
	return `Bearer ${token.token}`;
};

const getAuthHeader = (): any => {
	return { Authorization: getBearerToken() };
};

const addBearerToken = (request: any): any => {
	return {
		...request,
		headers: {
			...request.headers,
			...getAuthHeader(),
		},
	};
};

const addAuthBody = (request: any, body: any): any => {
	return {
		...request,
		headers: {
			...request.headers,
			...getAuthHeader(),
		},
		body: JSON.stringify(body),
	};
};

const clearToken = () => sessionStorage.removeItem(sessionKey);

export {
	login,
	mfa,
	forgetpassword,
	resetpassword,
	getToken,
	clearToken,
	getBearerToken,
	getAuthHeader,
	addBearerToken,
	addAuthBody,
};
