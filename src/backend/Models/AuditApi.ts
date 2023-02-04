import { AuditMeta, Client, Questionnaire } from './Common';

export interface Audit {
	id: number;
}

export interface Dashboard {
	New: number;
	Open: number;
	In_Progress: number;
	Completed: number;
}

export interface Status {
	success: boolean;
	org_ids: number[];
	client_ids: number[];
	client_count: number;
	dashboard: Dashboard;
}

export interface CreateResponse {
	audit_id: number;
	success: boolean;
}

export interface AuditListResponse {
	success: boolean;
	recordsTotal: number;
	recordsFiltered: number;
	data: AuditDetail[];
	draw: boolean;
}

export interface AuditDetail {
	id: number;
	name: string;
	status: string;
	data: AuditMeta;
	createdAt: Date;
	updatedAt: Date;
	ClientId: number;
	QuestionnaireId: number;
	Client: Client;
	Questionnaire: Questionnaire;
}

export interface GetAuditResponse {
	data: AuditDetail;
}

export interface GenerateAuditResponse {
	fileName: string;
	fileBlob: any;
}
