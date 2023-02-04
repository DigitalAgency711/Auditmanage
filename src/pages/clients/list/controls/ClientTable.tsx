import { Client, ListProps } from '../../common/Types';
import { Card, Container, Row } from 'react-bootstrap';
import { GrowingSpinner, PageSize, Table } from 'components';
import { useTranslation } from 'react-i18next';
import { translationNs } from '../../common/Constants';
import { Column } from 'react-table';
import { getSizePerPageList } from 'appConstants';
import { useEffect, useState } from 'react';
import useClientTable from '../hooks/useClientTable';

const getColumns = (t: any): ReadonlyArray<Column> => {
	return [
		{
			Header: t('table.columns.serial'),
			accessor: 'clientId',
			defaultCanSort: true,
		},
		{
			Header: t('table.columns.name'),
			accessor: 'name',
			defaultCanSort: true,
		},
		{
			Header: t('table.columns.description'),
			accessor: 'description',
			defaultCanSort: true,
		},
	];
};

const ClientTable = ({ newClient, orgId }: ListProps) => {
	const { t } = useTranslation(translationNs);
	const { busy, error, data, empty } = useClientTable(orgId, newClient);
	const [sizePerPageList, setSizePerPageList] = useState<PageSize[]>([]);

	useEffect(() => {
		setSizePerPageList(getSizePerPageList(data?.length ?? 0));
	}, [data]);

	return (
		<Card>
			<Card.Body>
				<Container>
					{error && (
						<Row>
							<strong className="text-danger">{t('table.unknownError')}</strong>
						</Row>
					)}
					{busy && !error && (
						<div>
							<strong className="text-info me-1 mt-1">Loading</strong>
							<GrowingSpinner color="info" className="mt-1" />
						</div>
					)}
					{!busy && !error && !empty && (
						<Row>
							<Table<Client>
								columns={getColumns(t)}
								data={data ?? []}
								pageSize={5}
								sizePerPageList={sizePerPageList}
								isSortable={true}
								pagination={true}
								theadClass={'table-info'}
								tableClass={'table-striped'}
							/>
						</Row>
					)}
				</Container>
			</Card.Body>
		</Card>
	);
};

export default ClientTable;
