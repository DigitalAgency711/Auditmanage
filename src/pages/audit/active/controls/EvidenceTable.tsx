import React from 'react';
import { Column } from 'react-table';
import { Evidence } from '../common/QuestionnaireTypes';
import { ErrorPopup, Table } from 'components';
import { Button, Col, Row } from 'react-bootstrap';
import EvidenceModal from './EvidenceModal';
import { EvidenceTableProps } from '../common/PropTypes';
import useEvidenceTable from '../hooks/useEvidenceTable';
import { useTranslation } from 'react-i18next';
import { translationNs } from '../common/common';

const columns: ReadonlyArray<Column> = [
	{ Header: 'Description', accessor: 'description' },
	{
		Header: 'File',
		accessor: 'name',
	},
	{ Header: 'Date', accessor: 'date' },
	{ Header: 'Reviewer', accessor: 'reviewer' },
	{ Header: 'Comments', accessor: 'comments' },
	{ Header: 'Approver', accessor: 'approver' },
	{ Header: 'id', accessor: 'id' },
];

const EvidenceTable = ({ auditId, questionId }: EvidenceTableProps) => {
	const { t } = useTranslation(translationNs);

	const {
		busy,
		error,
		noData,
		tableData,
		showModal,
		currentEvidence,
		onModalClose,
		setShowModal,
	} = useEvidenceTable(auditId, questionId);

	return (
		<>
			{error && (
				<ErrorPopup
					show={error}
					btnText={'Close'}
					text="An error occurred when fetching the table"
				/>
			)}
			{!busy && !noData && (
				<>
					<Table<Evidence>
						columns={columns}
						data={tableData}
						hiddenColumns={['id']}
						theadClass={'table-light'}
					/>
				</>
			)}
			{busy && (
				<Row>
					<span className="text-info">{t('audit.active.loading')}</span>
				</Row>
			)}
			<Row>
				<Col xs={11}></Col>
				<Col xs={1} className="p-0">
					<Button
						className="float-start mr-3"
						onClick={() => setShowModal(true)}>
						Add
					</Button>
				</Col>
			</Row>
			<EvidenceModal
				auditId={auditId}
				questionId={questionId}
				evidence={currentEvidence}
				show={showModal}
				onClose={onModalClose}
			/>
		</>
	);
};

export default EvidenceTable;
