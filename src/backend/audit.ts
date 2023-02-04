import { config, request } from './config';
import { addAuthBody, addBearerToken } from './authentication';
import {
	AuditListResponse,
	CreateResponse,
	GenerateAuditResponse,
	GetAuditResponse,
	Status as AuditStatus,
} from './Models/AuditApi';
import { TApiResult } from './Models/Common';

import { errorResponse, isError } from './util';

const getDashboard = async (
	orgId: number,
	clientId: number
): Promise<TApiResult<AuditStatus>> => {
	const orgFilter = isNaN(orgId) ? '' : `&orgId=${orgId}`;
	const clientFilter = isNaN(clientId) ? '' : `&clientId=${clientId}`;
	const url = config.apiHostUrl + `/auditStatus?${orgFilter}${clientFilter}`;

	const options = addBearerToken(request.json.get);
	const response = await fetch(url, options);

	if (isError(response)) return errorResponse;

	if (response.ok) return { ok: true, data: await response.json() };

	return errorResponse;
};

const getAuditList = async (): Promise<TApiResult<AuditListResponse>> => {
	const url = config.apiHostUrl + `/audit`;
	const options = addBearerToken(request.json.get);
	const response = await fetch(url, options);
	if (response.ok) return { ok: true, data: await response.json() };

	return errorResponse;
};

const startAudit = async (
	clientId: number,
	questionnaireId: number,
	name: string,
	description: string,
	respondent: string,
	reviewer: string,
	auditor: string
): Promise<TApiResult<number>> => {
	const url = config.apiHostUrl + `/audit`;
	// TODO respondent, reviewer, auditor are currently ignored.
	const body = {
		client_id: clientId,
		questionnaire_id: questionnaireId,
		name: name,
		description: description,
		respondent: respondent,
		reviewer: reviewer,
		auditor: auditor,
	};
	const options = addAuthBody(request.json.post, body);
	const response = await fetch(url, options);

	if (response.ok) {
		const result: CreateResponse = await response.json();
		return { ok: true, data: result.audit_id };
	}

	return errorResponse;
};

const getAudit = async (id: number): Promise<TApiResult<GetAuditResponse>> => {
	const url = config.apiHostUrl + `/audit/${id}`;
	const options = addBearerToken(request.json.get);
	const response = await fetch(url, options);
	const isError = !response.ok || response.status > 399;

	if (response.ok) {
		let result: GetAuditResponse = await response.json();
		return { ok: true, data: result };
	}

	if (isError) return { ok: false, data: undefined };

	throw new Error('Unknown response for getting audit data');
};

const getDefaultName = (id: number): string => {
	const date = new Date();
	return `Audit_${id}_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}.zip`;
};

const generateAudit = async (
	id: number
): Promise<TApiResult<GenerateAuditResponse>> => {
	const url = config.apiHostUrl + `/audit/${id}/createZip`;
	const options = addBearerToken(request.json.get);
	const response = await fetch(url, options);

	if (isError(response)) return errorResponse;

	const getFileName = () => {
		const hasHeaders = response && response.headers;
		const disposition =
			hasHeaders && response.headers.get('content-disposition');

		return disposition ? disposition.split('filename=')[1] : getDefaultName(id);
	};

	const data: GenerateAuditResponse = {
		fileBlob: await response.blob(),
		fileName: getFileName(),
	};

	return {
		ok: true,
		data,
	};
};

export { getDashboard, startAudit, getAudit, getAuditList, generateAudit };
