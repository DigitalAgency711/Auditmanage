import { config, request } from './config';
import { addAuthBody, addBearerToken } from './authentication';
import { CreateResponse, Result as ClientResult } from './Models/ClientApi';
import { TApiResult } from './Models/Common';

const getAllClients = async (
	orgId: number
): Promise<TApiResult<ClientResult>> => {
	const orgPath = orgId > 0 ? `orgId=${orgId}` : '';
	const length = 'length=10000'; //pagination needs to be figured out
	const url = config.apiHostUrl + `/client?${orgPath}&${length}`;
	const options = addBearerToken(request.json.get);
	const response = await fetch(url, options);

	const isError = !response.ok || response.status > 399;
	if (isError) return { ok: false, data: undefined };

	if (response.ok) return { ok: true, data: await response.json() };

	throw new Error('Unknown condition for getting clients');
};

const addClient = async (
	orgId: number,
	name: string,
	description: string
): Promise<TApiResult<number>> => {
	const url = config.apiHostUrl + `/client`;
	const body = {
		client_name: name,
		client_description: description,
		org_id: orgId,
	};
	const options = addAuthBody(request.json.post, body);
	const response = await fetch(url, options);

	if (response.ok) {
		const result: CreateResponse = await response.json();
		return { ok: true, data: result.client_id };
	}

	return { ok: false, data: undefined };
};

export { getAllClients, addClient };
