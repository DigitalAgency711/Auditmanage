import { DdlType } from 'types';

const toDdlData = (data: any[], defaultLabel?: any): DdlType[] => {
	const mapped = data.map((x, i): DdlType => ({ value: i + 1, label: x }));

	if (defaultLabel) {
		const defaultVal: DdlType = {
			value: 0,
			label: defaultLabel,
		};
		return [defaultVal, ...mapped];
	}

	return mapped;
};

export { toDdlData };
