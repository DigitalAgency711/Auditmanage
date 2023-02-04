import { PageSize } from '../components';

const StandardSizePerPageList: PageSize[] = [
	{
		text: '5',
		value: 5,
	},
	{
		text: '10',
		value: 10,
	},
	{
		text: '25',
		value: 25,
	},
];

const getSizePerPageList = (count: number): PageSize[] => {
	const all: PageSize = {
		text: 'All',
		value: count,
	};

	return [...StandardSizePerPageList, all];
};

export { StandardSizePerPageList, getSizePerPageList };
