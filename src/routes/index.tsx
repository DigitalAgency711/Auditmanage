import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import {
	DefaultLayout,
	DetachedLayout,
	FullLayout,
	HorizontalLayout,
	VerticalLayout,
} from 'layouts';
import PrivateRoute from './PrivateRoute';
import Root from './Root';
import { AppRoutes, LayoutTypes } from 'appConstants';
import { useRedux } from 'hooks';
import { UserRoles } from '../types';

// lazy load all the views

//sample: const Login = React.lazy(() => import('pages/account/Login'));

// auth
const Landing = React.lazy(() => import('pages/landing'));

//account
const Register = React.lazy(() => import('pages/account/Register'));
const ForgetPassword = React.lazy(()=>import('pages/account/ForgetPassword'));
const ResetPassword = React.lazy(()=>import('pages/account/ForgetPassword2'));
const MfaRequire = React.lazy(() => import('pages/account/Login'));

//dashboard
const AuditorDashboard = React.lazy(() => import('pages/dashboards/auditor'));

//audit
const ImportQuestionnaire = React.lazy(() => import('pages/audit/import'));
const StartAudit = React.lazy(() => import('pages/audit/start'));
const ActiveAudit = React.lazy(() => import('pages/audit/active'));

//clients
const Clients = React.lazy(() => import('pages/clients/list'));
const ClientSetting = React.lazy(() => import('pages/clients/settings'));

//error pages
const ErrorPageNotFound = React.lazy(() => import('pages/error/PageNotFound'));
const ServerError = React.lazy(() => import('pages/error/ServerError'));

//
const loading = () => <div className=""></div>;

type LoadComponentProps = {
	component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
	<Suspense fallback={loading()}>
		<Component />
	</Suspense>
);

const AllRoutes = () => {
	const { appSelector } = useRedux();

	const { layout } = appSelector(state => ({
		layout: state.Layout,
	}));

	const getLayout = () => {
		let layoutCls: React.ComponentType;

		switch (layout.layoutType) {
			case LayoutTypes.LAYOUT_HORIZONTAL:
				layoutCls = HorizontalLayout;
				break;
			case LayoutTypes.LAYOUT_DETACHED:
				layoutCls = DetachedLayout;
				break;
			case LayoutTypes.LAYOUT_FULL:
				layoutCls = FullLayout;
				break;
			default:
				layoutCls = VerticalLayout;
				break;
		}
		return layoutCls;
	};
	let Layout = getLayout();

	return useRoutes([
		{ path: '/', element: <Root /> },
		{
			// public routes
			path: '/',
			element: <DefaultLayout />,
			children: [
				{
					path: 'error-404',
					element: <LoadComponent component={ErrorPageNotFound} />,
				},
				{
					path: 'error-500',
					element: <LoadComponent component={ServerError} />,
				},
				{
					path: AppRoutes.Landing.relative,
					element: <LoadComponent component={Landing} />,
				},
			],
		},
		{
			path: '/',
			element: <DefaultLayout />,
			children: [
				{
					path: 'account',
					children: [
						{
							path: AppRoutes.Register.relative,
							element: <LoadComponent component={Register} />,
						},
						{
							path: AppRoutes.ForgetPassword.relative,
							element: <LoadComponent component={ForgetPassword} />
						},
						{
							path: AppRoutes.ResetPassword.relative,
							element:<LoadComponent component={ResetPassword} />
						},
						{
							path:AppRoutes.MfaRequire.relative,
							element : <LoadComponent component={MfaRequire} />
						}
					],
				},
			],
		},
		{
			// auth protected routes
			path: '/',
			element: <PrivateRoute roles={[UserRoles.Auditor]} component={Layout} />,
			children: [
				{
					path: 'dashboards',
					children: [
						{
							path: AppRoutes.Dashboard.relative,
							element: <LoadComponent component={AuditorDashboard} />,
						},
					],
				},
				{
					path: 'audit',
					children: [
						{
							path: AppRoutes.ImportQuestionnaire.relative,
							element: <LoadComponent component={ImportQuestionnaire} />,
						},
						{
							path: AppRoutes.StartAudit.relative,
							element: <LoadComponent component={StartAudit} />,
						},
						{
							path: AppRoutes.ActiveAudit.relative,
							element: <LoadComponent component={ActiveAudit} />,
						},
					],
				},
				{
					path: 'clients',
					children: [
						{
							path: AppRoutes.Clients.relative,
							element: <LoadComponent component={Clients} />,
						},
						{
							path: AppRoutes.ClientSetting.relative,
							element: <LoadComponent component={ClientSetting} />
						}
					],
				},
			],
		},
	]);
};

export { AllRoutes };
