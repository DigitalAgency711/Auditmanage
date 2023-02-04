export interface ApiResult {
	ok: boolean;
}

export interface TApiResult<T> {
	ok: boolean;
	data?: T;
}

export interface Organization {
	id: number;
	name: string;
}

export interface Client {
	id: number;
	name: string;
	Organization: Organization;
}

export interface Questionnaire {
	id: number;
	name: string;
}

export interface AuditMeta {
	auditor: string;
	reviewer: string;
	respondent: string;
	description: string;
}
