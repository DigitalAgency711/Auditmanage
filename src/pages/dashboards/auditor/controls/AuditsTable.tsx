import { Card, Container, Row } from 'react-bootstrap';
import { Column } from 'react-table';
import { Table } from 'components';
import { AuditTablePropType, TableData } from '../common/PropTypes';
import { AppRoutes, getSizePerPageList } from 'appConstants';
import { generatePath, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translationNs } from '../common/Constants';

const ActiveAuditLink = ({ item }: any) => {
	const to = generatePath(AppRoutes.ActiveAudit.Full(), {
		id: item.value,
	});
	return (
		<Link to={to}>
			<i className="uil uil-expand-from-corner"></i>
		</Link>
	);
};

const getColumns = (t: any): ReadonlyArray<Column> => {
	return [
		{
			Header: '',
			accessor: 'id',
			defaultCanSort: true,
			Cell: item => <ActiveAuditLink item={item} />,
		},
		{
			Header: t('table.columns.Customer'),
			accessor: 'customer',
			defaultCanSort: true,
		},
		{
			Header: t('table.columns.Questionnaire'),
			accessor: 'questionnaire',
			defaultCanSort: true,
		},
		{
			Header: t('table.columns.Status'),
			accessor: 'status',
			defaultCanSort: true,
		},
		{
			Header: t('table.columns.Respondent'),
			accessor: 'respondent',
			defaultCanSort: true,
		},
		{
			Header: t('table.columns.AuditDate'),
			accessor: 'auditDate',
			defaultCanSort: true,
		},
		{
			Header: t('table.columns.Reviewer'),
			accessor: 'reviewer',
			defaultCanSort: true,
		},
		{
			Header: t('table.columns.Auditor'),
			accessor: 'auditor',
			defaultCanSort: true,
		},
	];
};

const AuditsTable = ({ data }: AuditTablePropType) => {
	const { t } = useTranslation(translationNs);
	const sizePerPageList = getSizePerPageList(data.length);

	return (
		<>
			<Container>
				<Card>
					<Card.Body>
						<Container>
							<Row>
								<Table<TableData>
									columns={getColumns(t)}
									data={data}
									pageSize={5}
									sizePerPageList={sizePerPageList}
									isSortable={true}
									pagination={true}
									theadClass={'table-info'}
									tableClass={'table-striped'}
								/>
							</Row>
						</Container>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default AuditsTable;
