import { useEffect, useState } from 'react';

import { generateAudit, getAudit, getQuestionnaire } from 'backend';
import { QuestionnaireData } from 'backend/Models/QuestionnaireApi';

const empty: QuestionnaireData = {
	createdAt: '',
	description: '',
	id: 0,
	info: {
		version: '',
		audit_year: '',
	},
	name: '',
	org_id: 0,
	question_data: [],
	question_sections: [],
	updatedAt: '',
};

const useActiveAudit = ({ id, linkRef }: any) => {
	const [error, setError] = useState(false);
	const [busy, setBusy] = useState(true);
	const [auditMeta, setAuditMeta] = useState<any>({});
	const [questionnaire, setQuestionnaire] = useState<QuestionnaireData>(empty);
	const [generatingAudit, setGenerating] = useState(false);

	useEffect(() => {
		setBusy(true);

		const loadAudit = async () => {
			const auditResponse = await getAudit(id);
			if (!auditResponse.ok || !auditResponse.data) {
				setError(true);
				return;
			}

			const result = auditResponse.data.data;
			const questionnaire = result.Questionnaire;

			const questionnaireResponse = await getQuestionnaire(questionnaire.id);
			if (!questionnaireResponse.ok || !questionnaireResponse.data) {
				setError(true);
				return;
			}

			const questionnaireData = questionnaireResponse.data.data;
			setQuestionnaire(questionnaireData);

			const client = result.Client;
			const lastModified = new Date(result.updatedAt).toLocaleDateString();

			const meta = {
				questionnaire: `${questionnaire.name}, v${questionnaireData.info.version}`,
				org: client.name,
				lastModified,
			};
			setAuditMeta(meta);
		};

		loadAudit().then(() => {
			setBusy(false);
		});
	}, [id]);

	const onGenerate = async () => {
		setGenerating(true);

		await generateAudit(id).then(r => {
			if (!r.ok || !r.data) {
				setError(true);
				return;
			}

			const { fileName, fileBlob } = r.data;

			const anchor = linkRef.current;
			anchor.href = window.URL.createObjectURL(fileBlob);
			anchor.download = fileName;
			anchor.click();
			anchor.href = '#';
		});
		setGenerating(false);
	};

	return {
		error,
		busy,
		auditMeta,
		questionnaire,
		generatingAudit,
		onGenerate,
	};
};
export default useActiveAudit;
