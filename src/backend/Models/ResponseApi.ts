export interface Data {
	result: number;
	frequency: number;
	description: string;
	status: number;
}

//yes, the response is duplicated. that's because the "model" is called Response
export interface GetResponseResponse {
	success: boolean;
	empty: boolean;
	data?: {
		questionId: string;
		data: Data;
		createdAt: Date;
		updatedAt: Date;
		AuditId: number;
	};
}

export interface SaveResponseRequest {
	auditId: number;
	questionId: string;

	body: {
		data: Data;
	};
}

export interface AddEvidenceRequest {
	auditId: number;
	questionId: string;
	file: any;
	approver: string;
	comments: string;
	date: string;
	description: string;
	name: string;
	reviewer: string;
}

export interface GetEvidenceResponse {
	answer_files: AnswerFile[];
	answer_id: number;
}

export interface AnswerFile {
	file_id: string;
	file_name: string;
	mime_type: string;
	hash: string;
	info: Info;
	createdAt: string;
	updatedAt: string;
}

export interface Info {
	name: string;
	approver: string;
	comments: string;
	reviewer: string;
	description: string;
}
