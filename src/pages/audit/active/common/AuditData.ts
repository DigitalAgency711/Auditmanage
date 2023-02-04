import { AreaData, Areas } from './QuestionnaireTypes';

const getData = (key: string): Map<string, AreaData> => {
	const areas = new Map<string, AreaData>();

	try {
		const value = sessionStorage.getItem(key);
		if (value) {
			const arr: Areas = JSON.parse(value);
			for (const item of arr) {
				areas.set(item.key, item);
			}
		}
		return areas;
	} catch (e) {
		console.error('Could not parse areas', key);
	}

	return areas;
};

const setData = (key: string, areas: Map<string, AreaData>) => {
	const arr = Array.from(areas.values());
	const serialized = JSON.stringify(arr);
	sessionStorage.setItem(key, serialized);
};

export class AuditData {
	data: Map<string, AreaData>;
	key: string;
	questionnaireType: string;
	version: number;
	keys: string[];
	areas: Areas;

	constructor(key: string, questionnaireType: string, version: number) {
		this.key = key;
		this.questionnaireType = questionnaireType;
		this.version = version;
		this.data = getData(this.key);
		this.keys = [];
		this.areas = [];
	}

	set(areas: Map<string, AreaData>): void {
		this.data = areas;
		this.keys = Array.from(areas.keys());
		this.areas = Array.from(areas.values());
		setData(this.key, this.data);
	}
}
