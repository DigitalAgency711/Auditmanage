import { AppRoutes } from './AppRoutes';

export type MenuItemType = {
	key: string;
	label: string;
	isTitle?: boolean;
	icon?: string;
	url?: string;
	badge?: {
		variant: string;
		text: string;
	};
	parentKey?: string;
	target?: string;
	children?: MenuItemType[];
};

const MENU_ITEMS: MenuItemType[] = [
	{
		key: 'dashboardParent',
		label: '',
		isTitle: true,
	},
	{
		key: 'dashboards',
		label: 'Dashboards',
		isTitle: false,
		icon: 'uil-chart-pie',
		children: [
			{
				key: 'ds-auditor',
				label: 'Audits',
				url: AppRoutes.Dashboard.full,
				parentKey: 'dashboardParent',
			},
		],
	},
	{
		key: 'auditParent',
		label: '',
		isTitle: true,
	},
	{
		key: 'questionnaires',
		label: 'Audit',
		isTitle: false,
		icon: 'uil-briefcase',
		children: [
			{
				key: 'audit-import',
				label: 'Import Questionnaire',
				url: AppRoutes.ImportQuestionnaire.full,
				parentKey: 'auditParent',
			},
			{
				key: 'audit-start',
				label: 'Start Audit',
				url: AppRoutes.StartAudit.full,
				parentKey: 'auditParent',
			},
		],
	},
	{
		key: 'clientParent',
		label: '',
		isTitle: true,
	},
	{
		key: 'clients',
		label: 'Clients',
		isTitle: false,
		icon: 'uil-sitemap',
		children: [
			{
				key: 'clients-list',
				label: 'All',
				url: AppRoutes.Clients.full,
				parentKey: 'clientParent',
			},
			{
				key: 'clients-list',
				label: 'Settings',
				url: AppRoutes.ClientSetting.full,
				parentKey: 'clientParent',
			}
		],
	},
];

export { MENU_ITEMS };
