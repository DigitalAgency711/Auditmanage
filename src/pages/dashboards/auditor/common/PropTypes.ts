export enum StatusColour {
	Success,
	Info,
	Warning,
	None,
}

export type StatusProps = {
	label: String;
	value: number;
	colour: StatusColour;
};

export type AuditorDashData = {
	status: StatusProps[];
	tableData: TableData[];
	busy: boolean;
	error: boolean;
};

export type TableData = {
	id: number;
	customer: string;
	questionnaire: string;
	status: string;
	respondent: string;
	auditDate?: string;
	reviewer: string;
	auditor: string;
};

export interface AuditTablePropType {
	data: TableData[];
}
