import { config, request } from './config';
import { addAuthBody, addBearerToken, getAuthHeader } from './authentication';
import {
	AddEvidenceRequest,
	GetEvidenceResponse,
	GetResponseResponse,
	SaveResponseRequest,
} from './Models/ResponseApi';
import { emptySuccess, errorResponse, isError, isNotFound } from './util';
import { TApiResult } from './Models/Common';
import { Verbs } from './constants';

const responseNotFound: TApiResult<GetResponseResponse> = {
	ok: true,
	data: { success: false, empty: true, data: undefined },
};

const getResponse = async (
	auditId: number,
	questionId: string
): Promise<TApiResult<GetResponseResponse>> => {
	const url = config.apiHostUrl + `/audit/${auditId}/response/${questionId}`;

	const options = addBearerToken(request.json.get);
	const response = await fetch(url, options);

	if (isNotFound(response)) return responseNotFound;
	if (isError(response)) return errorResponse;

	const responseData = await response.json();

	return {
		ok: true,
		data: {
			success: true,
			empty: false,
			data: responseData,
		},
	};
};

const saveResponse = async (
	e: SaveResponseRequest
): Promise<TApiResult<any>> => {
	const url =
		config.apiHostUrl + `/audit/${e.auditId}/response/${e.questionId}`;

	const options = addAuthBody(request.json.put, e.body);
	const response = await fetch(url, options);

	return isError(response) ? errorResponse : emptySuccess;
};

const addEvidence = async (e: AddEvidenceRequest): Promise<TApiResult<any>> => {
	const url = config.apiHostUrl + `/audit/${e.auditId}/file/${e.questionId}`;

	const formData = new FormData();
	formData.append('approver', `${e.approver}`);
	formData.append('comments', `${e.comments}`);
	//this field isn't accepted by the server at this point?
	formData.append('date', `${e.date}`);
	formData.append('description', `${e.description}`);
	formData.append('name', `${e.name}`);
	formData.append('reviewer', `${e.reviewer}`);
	formData.append('file', e.file);

	const options = {
		...request.json.post,
		headers: {
			mode: 'cors',
			method: Verbs.POST,
			...getAuthHeader(),
		},
		body: formData,
	};

	const response = await fetch(url, options);
	return response.ok ? emptySuccess : errorResponse;
};

const getEvidence = async (
	auditId: number,
	questionId: string
): Promise<TApiResult<GetEvidenceResponse>> => {
	const url = config.apiHostUrl + `/audit/${auditId}/file/${questionId}`;
	const options = addBearerToken(request.json.get);
	const response = await fetch(url, options);

	if (isError(response)) return errorResponse;

	return { ok: true, data: await response.json() };
};

export { getResponse, saveResponse, addEvidence, getEvidence };
