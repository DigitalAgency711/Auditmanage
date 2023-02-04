import { config, request as apiRequest } from './config';
import { addBearerToken } from './authentication';
import { TApiResult } from './Models/Common';
import { UserResult } from './Models/UserApi';

const userKey = 'sessionUser';

const fetchUser = async (): Promise<TApiResult<UserResult>> => {
	const url = config.apiHostUrl + '/user';
	const request = addBearerToken(apiRequest.json.get);
	const response = await fetch(url, request);

	if (response.ok) {
		let data = await response.json();
		return { ok: response.ok, data };
	}

	return { ok: false };
};

const saveUser = (e: UserResult | undefined) => {
	if (!e) {
		return;
	}
	const serialized = JSON.stringify(e);
	sessionStorage.setItem(userKey, serialized);
};

const getUser = (): UserResult | undefined => {
	let serialized = sessionStorage.getItem(userKey);
	if (serialized === null) {
		return undefined;
	}

	try {
		return JSON.parse(serialized);
	} catch (e) {
		console.error('Could not deserialize user!');
		return undefined;
	}
};

const loadUser = async (): Promise<UserResult | undefined> => {
	let result = getUser();

	if (!result) {
		const { ok, data } = await fetchUser();
		if (ok) {
			saveUser(data);
			return data;
		}
		//we can't reach here... typically.
		throw new Error('Could not fetch user!');
	}

	return result;
};

export { loadUser };
