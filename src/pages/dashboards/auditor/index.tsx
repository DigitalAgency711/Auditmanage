import React from 'react';
import useAuditor from './hooks/useAuditor';
import { Col, Container, Row } from 'react-bootstrap';

import { GrowingSpinner, PageTitle } from 'components';
import { AppRoutes } from 'appConstants';
import { useTranslation } from 'react-i18next';
import { translationNs } from './common/Constants';

const Status = React.lazy(() => import('./controls/Status'));
const AuditsTable = React.lazy(() => import('./controls/AuditsTable'));

const AuditorDashboard = () => {
	const { t } = useTranslation(translationNs);
	const { status, tableData, busy } = useAuditor();

	return (
		<>
			<PageTitle
				breadCrumbItems={[
					{ label: t('path.Dashboard'), path: AppRoutes.Dashboard.Full() },
					{
						label: t('title'),
						path: AppRoutes.Dashboard.Full(),
						active: true,
					},
				]}
				title={t('title')}
			/>
			{busy && (
				<Container>
					<Row>
						<span>
							Loading <GrowingSpinner color="primary" />
						</span>
					</Row>
				</Container>
			)}
			{!busy && (
				<Container>
					<Row className="mt-1">
						{status.map((x, i) => (
							<Col key={`col_${i}`}>
								<Status
									colour={x.colour}
									label={x.label}
									value={x.value}
									key={`status_${i}`}
								/>
							</Col>
						))}
					</Row>
					<Row>
						<AuditsTable data={tableData} />
					</Row>
				</Container>
			)}
		</>
	);
};

export default AuditorDashboard;
