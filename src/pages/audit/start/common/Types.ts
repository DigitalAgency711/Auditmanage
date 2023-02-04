export interface AuditForm {
	clientId: number;
	respondentName: string;
	reviewerName: string;
	auditorName: string;
	description: string;
	name: string;
	questionnaireId: number;
}

export type AuditCreatedHandler = (auditId: AuditForm) => void;
