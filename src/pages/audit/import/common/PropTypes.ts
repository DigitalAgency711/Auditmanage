export interface ImportData {
	id: number;
	name: string;
	version: number;
	auditYear: string;
	importedDate: string;
}

export interface Questionnaire {
	name: string;
	csvFile: any;
	version: number;
	auditYear: string;
}

export interface UploadProps {
	orgId?: number;
	onUploaded: (id: number) => void;
}

export interface ImportDataProps {
	questionnaireId: number;
}
