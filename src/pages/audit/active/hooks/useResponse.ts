import {
	Evidence,
	Frequency,
	FrequencyDdlData,
	Navigation,
	Question,
	Questions,
	Result,
	ResultDdlData,
	Status,
	StatusDdlData,
} from '../common/QuestionnaireTypes';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
	GetResponseResponse,
	SaveResponseRequest,
} from 'backend/Models/ResponseApi';
import { getResponse, saveResponse } from 'backend/responses';
import { TApiResult } from 'backend/Models/Common';
import { getQuestion } from './getQuestion';

const useResponse = (
	question: Question | undefined,
	auditId: number,
	questions: Questions,
	section: string,
	onQuestionChanged: (q: Question) => void
) => {
	const [error, setError] = useState(false);
	const [saving, setSaving] = useState(false);
	const [result, setResult] = useState(Result.None);
	const [description, setDescription] = useState('');
	const [evidences] = useState<Evidence[]>([]);
	const [frequency, setFrequency] = useState(Frequency.None);
	const [status, setStatus] = useState(Status.Pending);

	useEffect(() => {
		if (question === undefined) {
			return;
		}

		setSaving(true);

		const transform = (r: TApiResult<GetResponseResponse>): any => {
			if (!r.ok || !r.data) {
				setError(true);
				setSaving(false);
				return undefined;
			}

			return r.data.data?.data;
		};

		const set = (data: any) => {
			if (data === undefined || !data.data) {
				setDescription('');
				setFrequency(Frequency.None);
				setStatus(Status.Pending);
				setResult(Result.None);
			} else {
				const actualData = data.data;

				setDescription(actualData.description);
				setFrequency(actualData.frequency);
				setStatus(actualData.status);
				setResult(actualData.result);
			}

			setSaving(false);
		};

		getResponse(auditId, question.id).then(transform).then(set);
	}, [question, auditId]);

	const onResultChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const index = Number.parseInt(e.currentTarget.value);
		setResult(ResultDdlData[index].value);
	};

	const onFrequencyChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const index = Number.parseInt(e.currentTarget.value);
		setFrequency(FrequencyDdlData[index].value);
	};

	const onStatusChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const index = Number.parseInt(e.currentTarget.value);
		setStatus(StatusDdlData[index].value);
	};

	const onSave = async () => {
		const request: SaveResponseRequest = {
			auditId: auditId,
			questionId: question?.id ?? '',
			body: {
				data: {
					result,
					frequency,
					description,
					status,
				},
			},
		};

		const saveResult = await saveResponse(request);
		setError(!saveResult.ok);
	};

	const onMove = async (n: Navigation) => {
		if (question === undefined) {
			return;
		}
		const next = getQuestion(question, questions, section, n);
		if (next === undefined) {
			return;
		}
		setSaving(true);
		await onSave();
		onQuestionChanged(next);
		setSaving(false);
	};

	const onDismissError = () => setError(false);

	return {
		result,
		description,
		evidences,
		frequency,
		status,
		error,
		saving,
		onResultChange,
		setDescription,
		onFrequencyChange,
		onStatusChange,
		onDismissError,
		onMove,
	};
};

export default useResponse;
