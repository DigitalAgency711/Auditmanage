import { Evidence } from './QuestionnaireTypes';
import { QuestionnaireData } from 'backend/Models/QuestionnaireApi';

export enum CountColour {
	Success,
	Info,
	Warning,
	Dark,
}

export interface ProgressCountProps {
	label: string;
	value: number;
	colour: CountColour;
	busy?: Boolean;
}

export interface ProgressCountsProps {
	counts: ProgressCountProps[];
	busy?: boolean;
}

export interface SectionProps {
	section: string;
}

export interface SectionsProps {
	sections: string[];
	active: string;
	onChange: (section: string | null) => void;
}

export interface QuestionsProps {
	auditId: number;
	questionnaire: QuestionnaireData;
}

export interface EvidenceTableProps {
	auditId: number;
	questionId: string;
}

export interface EvidenceModalProps {
	auditId: number;
	questionId: string;
	show: boolean;
	evidence?: Evidence;
	onClose: (e: Evidence) => void;
}
