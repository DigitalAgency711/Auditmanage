export enum Result {
	None,
	Yes,
	No,
	NA,
}

export interface ResultDdlType {
	value: Result;
	label: string;
}

const ResultDdlData: ResultDdlType[] = [
	{ value: Result.None, label: 'None' },
	{ value: Result.Yes, label: 'Yes' },
	{ value: Result.No, label: 'No' },
	{ value: Result.NA, label: 'N/A' },
];

export enum Frequency {
	None,
	Daily,
	Weekly,
	Monthly,
	Yearly,
}

export interface FrequencyDdlType {
	value: Frequency;
	label: string;
}

const FrequencyDdlData: FrequencyDdlType[] = [
	{ value: Frequency.None, label: 'Select' },
	{ value: Frequency.Daily, label: 'Daily' },
	{ value: Frequency.Weekly, label: 'Weekly' },
	{ value: Frequency.Monthly, label: 'Monthly' },
	{ value: Frequency.Yearly, label: 'Yearly' },
];

export enum Status {
	Pending,
	Done,
}

export interface StatusDdlType {
	value: Status;
	label: string;
}

const StatusDdlData: StatusDdlType[] = [
	{ value: Status.Pending, label: 'Pending' },
	{ value: Status.Done, label: 'Done' },
];

export { ResultDdlData, FrequencyDdlData, StatusDdlData };

export interface Question {
	PrimaryTag: string;
	Fields: {
		detail: string;
		name: string;
	};
	id: string;
	section: number;
	sectionNumber: number;
	serialId: number;
	tags: string[];
	tagDisplay: string;
}

export type Questions = Question[];

export interface AreaData {
	key: string;
	title: string;
	questions: Question[];
}

export type Areas = AreaData[];

export interface Evidence {
	id: string;
	name: string;
	description: string;
	file?: any;
	date: string;
	reviewer: string;
	comments: string;
	approver: string;
}

export enum Navigation {
	None,
	First,
	Previous,
	Next,
	Last,
}
