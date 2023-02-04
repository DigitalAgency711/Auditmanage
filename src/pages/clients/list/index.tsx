import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { PageTitle } from 'components';
import { AppRoutes } from 'appConstants';
import { useTranslation } from 'react-i18next';
import { translationNs } from '../common/Constants';
import useList from './hooks/useList';

const Create = React.lazy(() => import('./controls/Create'));
const ClientTable = React.lazy(() => import('./controls/ClientTable'));

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
					<Create onAdded={onAdded} orgId={orgId} />
				</Row>
				<Row>
					<ClientTable newClient={newClient} orgId={orgId} />
				</Row>
			</Container>
		</>
	);
};

export default ClientList;
