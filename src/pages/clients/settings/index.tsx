import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { PageTitle } from 'components';
import { AppRoutes } from 'appConstants';
import { useTranslation } from 'react-i18next';
import { translationNs } from '../common/Constants';
import useList from './hooks/useList';

const CreateSetting = React.lazy(() => import('./controls/CreateSetting'));
const ResetPassword = React.lazy(() => import('./controls/ResetPassword'));

const ClientList = () => {
	const { t } = useTranslation(translationNs);
	const { newClient, orgId, onAdded } = useList();

	return (
		<>
			<PageTitle
				breadCrumbItems={[
					{
						label: t('root.url'),
						path: AppRoutes.Clients.Full(),
					},
				]}
				title={t('list.pageTitle')}
			/>
			<Container>
				<Row>
					<CreateSetting/>
				</Row>
				<Row>
					<ResetPassword />
				</Row>
			</Container>
		</>
	);
};

export default ClientList;
