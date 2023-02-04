import { AuditForm } from '../common/Types';
import { useEffect, useState } from 'react';
import { getAllClients, getAllQuestionnaires, startAudit } from 'backend';
import { QuestionnaireEntry } from 'backend/Models/QuestionnaireApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Client } from 'backend/Models/ClientApi';
import { AppRoutes } from 'appConstants';
import { generatePath, useNavigate } from 'react-router-dom';

const mapClientResponse = (e: Client): { value: number; label: string } => {
	return {
		value: e.id,
		label: e.name,
	};
};

const mapQuestionnaireResponse = (
	e: QuestionnaireEntry
): { value: number; label: string } => {
	return {
		value: e.id,
		label:
			e.name +
			' ' +
			parseFloat(e.info.version) +
			' (' +
			e.info.audit_year +
			')',
	};
};

const defaultEntry = {
	value: 0,
	label: 'N/A',
};

const validators = {
	name: yup.string().required(),
	description: yup.string().required(),
	respondentName: yup.string().required(),
};

export interface AuditCreateError {
	name: boolean;
	description: boolean;
	clientId: boolean;
	respondentName: boolean;
	reviewerName: boolean;
	auditorName: boolean;
	questionnaireId: boolean;
}

const noError: AuditCreateError = {
	name: false,
	description: false,
	clientId: false,
	respondentName: false,
	reviewerName: false,
	auditorName: false,
	questionnaireId: false,
};

const useStartAudit = (clientId: number, quesId: number) => {
	const [clientList, setClientList] = useState<
		{ value: number; label: string }[]
	>([defaultEntry]);
	const [qTypes, setQTypes] = useState<{ value: number; label: string }[]>([
		defaultEntry,
	]);

	const schema = yup.object().shape(validators);

	const { register, handleSubmit, resetField } = useForm<AuditForm>({
		resolver: yupResolver(schema),
	});

	const [error, setError] = useState(false);
	const [formError, setFormError] = useState<AuditCreateError>(noError);
	const [busy, setBusy] = useState<boolean>(false);
	let navigate = useNavigate();

	const onSubmit = async (e: any) => {
		//for now, 0 as the default orgId is enough
		setFormError(noError);
		setBusy(true);

		const result = await startAudit(
			clientId,
			quesId,
			e.name,
			e.description,
			e.respondentName,
			e.reviewerName,
			e.auditorName
		);

		setError(!result.ok);

		if (result.ok) {
			const to = generatePath(AppRoutes.ActiveAudit.Full(), {
				id: result.data?.toString(),
			});
			navigate(to);
		}

		resetField('name');
		resetField('description');
		resetField('respondentName');
		resetField('reviewerName');
		resetField('auditorName');
		setBusy(false);
	};

	useEffect(() => {
		setBusy(true);

		getAllClients(NaN)
			.then(result => {
				setBusy(true); //just in case the call to getAllQuestionnaires has already set the busy indicator to false

				if (result.ok && result.data) {
					const clients = result.data;
					const mapped = clients.data.map(mapClientResponse);
					setClientList(mapped);
				} else {
					setError(true);
				}

				setBusy(false);
			})
			.catch(() => {
				setError(true);
			});

		getAllQuestionnaires(NaN)
			.then(result => {
				setBusy(true); //just in case the call to getAllClients has already set the busy indicator to false
				if (result.ok && result.data) {
					const clients = result.data;
					const mapped = clients.data.map(mapQuestionnaireResponse);
					setQTypes(mapped);
				} else {
					setError(true);
				}
				setBusy(false);
			})
			.catch(() => setError(true));

		return () => setQTypes([]);
	}, []);

	const onError = async (e: any) => {
		let err: AuditCreateError = {
			name: !!e.name,
			description: !!e.description,
			clientId: !e.clientId,
			respondentName: !e.respondentName,
			reviewerName: !e.reviewerName,
			auditorName: !e.auditorName,
			questionnaireId: !e.questionnaireId,
		};
		setFormError(err);
	};

	return {
		clientList: clientList,
		questionnaireTypes: qTypes,
		busy,
		error,
		formError,
		register,
		onSubmit: handleSubmit(onSubmit, onError),
	};
};

export default useStartAudit;
