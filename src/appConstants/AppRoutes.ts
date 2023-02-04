export interface IAppRoute {
	relative?: string;
	full?: string;
	parent: string;

	Full(): string;
}

export class AppRoute implements IAppRoute {
	full?: string;
	parent: string;
	relative?: string;

	constructor(parent: string, full?: string, relative?: string) {
		this.full = full;
		this.relative = relative;
		this.parent = parent;
	}

	Full(): string {
		return this.full ?? '';
	}
}

interface AllRoutes {
	Root: IAppRoute;
	Landing: IAppRoute;
	Dashboard: IAppRoute;
	ImportQuestionnaire: IAppRoute;
	StartAudit: IAppRoute;
	ActiveAudit: IAppRoute;
	Register: IAppRoute;
	Clients: IAppRoute;
	ClientSetting : IAppRoute;
	ForgetPassword : IAppRoute;
	ResetPassword : IAppRoute;
	MfaRequire : IAppRoute;
}

const root = new AppRoute('/', '/landing', 'landing');

const dashboardRootUrl = '/dashboards';
const auditRootUrl = '/audit';

const AppRoutes: AllRoutes = {
	Root: root,
	Landing: root,
	Dashboard: new AppRoute(dashboardRootUrl, '/dashboards/audits', 'audits'),
	ImportQuestionnaire: new AppRoute(
		auditRootUrl,
		auditRootUrl + '/import',
		'import'
	),
	StartAudit: new AppRoute(auditRootUrl, auditRootUrl + '/start', 'start'),
	ActiveAudit: new AppRoute(
		auditRootUrl,
		auditRootUrl + '/active/:id',
		'active/:id'
	),
	Register: new AppRoute('/account', '/account/register', 'register'),
	Clients: new AppRoute('/clients', '/clients/list', 'list'),
	ClientSetting : new AppRoute('/clients',"clients/settings","settings"),
	ForgetPassword : new AppRoute ("forgetpassword",'/account/forget','forget' ),
	ResetPassword : new AppRoute('/resetpassword','/account/reset','reset'),
	MfaRequire : new AppRoute('/mfa','/account/mfa','mfa')
};

export { AppRoutes };
