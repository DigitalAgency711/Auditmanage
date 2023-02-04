import { ImportData } from '../common/PropTypes';
import { getAllQuestionnaires } from 'backend';
import { useEffect, useState } from 'react';
import { QuestionnaireEntry } from 'backend/Models/QuestionnaireApi';

const mapApiResponse = (e: QuestionnaireEntry): ImportData => {
	return {
		id: e.id,
		auditYear: e.info.audit_year,
		importedDate: e.createdAt.toLocaleString(),
		version: parseFloat(e.info.version),
		name: e.name,
	};
};

const useImportData = (questionnaireId: number) => {
	const defaultEntry = {
		id: 0,
		auditYear: '1900',
		importedDate: '1900',
		version: 19.0,
		name: '1900',
	};

	const [error, setError] = useState(false);
	const [busy, setBusy] = useState(false);
	const [data, setData] = useState<ImportData[]>([defaultEntry]);

	useEffect(() => {
		setBusy(true);

		getAllQuestionnaires(0).then(result => {
			setError(!result.ok);
			if (result.ok && result.data) {
				const clients = result.data;
				const mapped = clients.data.map(mapApiResponse);
				setData(mapped);
			} else {
				setData([]);
			}
			setBusy(false);
		});
	}, [questionnaireId]);

	return { busy, data, error };
};

export default useImportData;
