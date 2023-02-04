import { config, request } from './config';
import { addBearerToken, getAuthHeader } from './authentication';
import { TApiResult } from './Models/Common';
import {
	GetQuestionnaireResponse,
	Result as QuestionnaireResult,
	UploadResult,
} from './Models/QuestionnaireApi';
import { Verbs } from './constants';
import { errorResponse } from './util';

const uploadError: TApiResult<number> = { ok: false, data: -1 };

const create = async (
	name: string,
	auditYear: string,
	version: string,
	csvFile: any,
	orgId?: number
): Promise<TApiResult<number>> => {
	const url = config.apiHostUrl + '/questionnaire/CSV';

	const formData = new FormData();
	formData.append('orgId', `${orgId}`);
	formData.append('name', name);
	formData.append('description', ``);
	formData.append('version', `${version}`);
	formData.append('audit_year', `${auditYear}`);
	formData.append('csv_format', ``);
	formData.append('csvFile', csvFile);

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
	if (response.ok) {
		const result: UploadResult = await response.json();
		return result.success
			? { ok: true, data: result.questionnaire_id }
			: uploadError;
	}

	return uploadError;
};

const getAllQuestionnaires = async (
	orgId: number
): Promise<TApiResult<QuestionnaireResult>> => {
	const orgPath = orgId > 0 ? `orgId=${orgId}` : '';
	const length = 'length=10000'; //pagination needs to be figured out
	const url = config.apiHostUrl + `/questionnaire?${orgPath}&${length}`;
	const options = addBearerToken(request.json.get);
	const response = await fetch(url, options);

	const isError = !response.ok || response.status > 399;
	if (isError) return { ok: false, data: undefined };

	if (response.ok) return { ok: true, data: await response.json() };

	throw new Error('Unknown condition for getting questionnaires');
};

const getQuestionnaire = async (
	id: number
): Promise<TApiResult<GetQuestionnaireResponse>> => {
	const url = config.apiHostUrl + `/questionnaire/${id}`;
	const options = addBearerToken(request.json.get);
	const response = await fetch(url, options);
	if (response.ok) return { ok: true, data: await response.json() };
	return errorResponse;
};

export { getAllQuestionnaires, create, getQuestionnaire };
