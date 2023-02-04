import { useEffect, useState } from 'react';
import { Evidence } from '../common/QuestionnaireTypes';
import { getEvidence } from 'backend/responses';
import { GetEvidenceResponse } from 'backend/Models/ResponseApi';
import { delay } from 'utils';

const empty: Evidence = {
	approver: '',
	comments: '',
	date: '',
	description: '',
	id: '',
	name: '',
	reviewer: '',
};

const emptyArr: Evidence[] = [];

const mapResponse = (r: GetEvidenceResponse): Evidence[] =>
	r.answer_files.map(f => ({
		reviewer: f.info.reviewer,
		approver: f.info.approver,
		comments: f.info.comments,
		date: new Date(Date.parse(f.updatedAt)).toDateString(),
		description: f.info.description,
		name: f.file_name,
		id: f.file_id,
	}));

const useEvidenceTable = (auditId: number, questionId: string) => {
	const [busy, setBusy] = useState(false);
	const [error] = useState(false);
	const [tableData, setData] = useState(emptyArr);
	const [currentEvidence, setCurrentEvidence] = useState(empty);
	const [showModal, setShowModal] = useState(false);
	const [noData, setNoData] = useState(true);
	const [ctr, setCtr] = useState(0);

	useEffect(() => {
		console.log('Updating evidence table', auditId, questionId, ctr);

		const load = async () => {
			setBusy(true);

			const r = await getEvidence(auditId, questionId);
			if (!r.ok || !r.data) {
				return;
			}

			await delay(300);

			const updated = mapResponse(r.data);
			setNoData(updated.length === 0);
			setData(updated);
		};

		load().then(() => {
			setBusy(false);
		});
	}, [auditId, questionId, ctr]);

	const onModalClose = async (e: Evidence) => {
		setShowModal(false);
		setCurrentEvidence(e);
		setCtr(v => v + 1);
	};

	return {
		busy,
		error,
		noData,
		tableData,
		showModal,
		currentEvidence,
		onModalClose,
		setShowModal,
	};
};

export default useEvidenceTable;
