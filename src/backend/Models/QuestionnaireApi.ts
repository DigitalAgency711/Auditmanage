export interface QuestionnaireInfo {
	version: string;
	audit_year: string;
}

export interface QuestionnaireEntry {
	id: number;
	org_id: number;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	info: QuestionnaireInfo;
}

export interface Result {
	success: boolean;
	recordsTotal: number;
	recordsFiltered: number;
	data: QuestionnaireEntry[];
}

export interface UploadResult {
	success: boolean;
	questionnaire_id: number;
}

export interface GetQuestionnaire {
	questionnaire_name: string;
	sections: string[];
}

export interface GetQuestionnaireResponse {
	success: boolean;
	data: QuestionnaireData;
}

export interface QuestionnaireData extends QuestionnaireEntry {
	question_data: QuestionData[];
	question_sections: string[];
}

export interface QuestionData {
	tags: string[];
	section: number;
	serial_id: number;
	primary_tag: string;
	question_id: string;
	section_number: number;
	question_fields: QuestionFields;
}

export interface QuestionFields {
	short_name: string;
	control_detail: string;
}
