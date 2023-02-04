import { Card, Container, Row } from 'react-bootstrap';
import { GrowingSpinner, Table } from 'components';
import { Column } from 'react-table';
import useImportData from '../hooks/useImportData';
import { getSizePerPageList } from 'appConstants';
import { ImportDataProps } from '../common/PropTypes';
import { useTranslation } from 'react-i18next';
import { translationNs } from '../common/constants';

const columns: ReadonlyArray<Column> = [
	{
		Header: 'Sl. No.',
		accessor: 'id',
		defaultCanSort: true,
	},
	{
		Header: 'Questionnaire',
		accessor: 'name',
		defaultCanSort: true,
	},
	{
		Header: 'Version',
		accessor: 'version',
		defaultCanSort: true,
	},
	{
		Header: 'Audit Year',
		accessor: 'auditYear',
		defaultCanSort: true,
	},
	{
		Header: 'Imported on',
		accessor: 'importedDate',
		defaultCanSort: true,
	},
];

const DataTable = ({ questionnaireId }: ImportDataProps) => {
	const { t } = useTranslation(translationNs);
	const { busy, data, error } = useImportData(questionnaireId);
	const sizePerPageList = getSizePerPageList(data.length);

	return (
		<>
			<Container>
				<Card>
					<Card.Body>
						<Container>
							{error && (
								<Row>
									<strong className="text-danger">
										{t('import.table.unknownError')}
									</strong>
								</Row>
							)}
							{busy && !error && (
								<div>
									<strong className="text-info me-1 mt-1">Loading</strong>
									<GrowingSpinner color="info" className="mt-1" />
								</div>
							)}
							{!busy && !error && (
								<Row>
									<Table
										columns={columns}
										data={data}
										pageSize={5}
										sizePerPageList={sizePerPageList}
										isSortable={true}
										pagination={true}
									/>
								</Row>
							)}
						</Container>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default DataTable;
