import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Evidence } from '../common/QuestionnaireTypes';
import { useForm } from 'react-hook-form';
import { addEvidence } from 'backend/responses';

const emptyEvidence: Evidence = {
	approver: '',
	comments: '',
	date: '',
	description: '',
	id: '',
	name: '',
	reviewer: '',
};

const validators = {
	name: yup.string().required(),
	file: yup.mixed().notRequired(),
	date: yup.date().required(),
	reviewer: yup.string().required(),
	approver: yup.string().required(),
	description: yup.string().notRequired().min(1),
	comments: yup.string().notRequired().min(1),
};

export interface EvidenceFormError {
	any: boolean;
	approver: boolean;
	comments: boolean;
	date: boolean;
	description: boolean;
	name: boolean;
	reviewer: boolean;
	evidenceFile: boolean;
}

const noError: EvidenceFormError = {
	any: false,
	approver: false,
	comments: false,
	date: false,
	description: false,
	name: false,
	reviewer: false,
	evidenceFile: false,
};

const useEvidence = (
	evidence: Evidence | undefined,
	show: boolean,
	onClose: (e: Evidence) => void,
	auditId: number,
	questionId: string
) => {
	const [id, setId] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [date, setDate] = useState('');
	const [name, setName] = useState('');
	const [reviewer, setReviewer] = useState('');
	const [comments, setComments] = useState('');
	const [approver, setApprover] = useState('');
	const [busy, setBusy] = useState(false);
	const [isOpen, setIsOpen] = useState(show);
	const [error, setError] = useState(false);
	const [formError, setFormError] = useState<EvidenceFormError>(noError);

	const schema = yup.object().shape(validators);

	useEffect(() => {
		const current = evidence ?? emptyEvidence;
		setId(new Date().getTime().toString());
		setDate(current.date);
		setName(current.name);
		setDescription(current.description);
		setReviewer(current.reviewer);
		setComments(current.comments);
		setApprover(current.approver);
	}, [evidence]);

	useEffect(() => {
		setIsOpen(show);
	}, [show]);

	const { register, handleSubmit, resetField } = useForm<Evidence>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (e: any) => {
		//validate the file
		const file: FileList = e.file;
		if (file?.length !== 1) {
			let err: EvidenceFormError = { ...noError };
			err.any = true;
			err.evidenceFile = true;
			setFormError(err);
			return;
		}
		setBusy(true);

		//update the backing fields
		setDate(e.date);
		setName(e.name);
		setDescription(e.description);
		setReviewer(e.reviewer);
		setComments(e.comments);
		setApprover(e.approver);

		//save the date in the server
		const result = await addEvidence({
			comments: e.comments,
			auditId: auditId,
			questionId: questionId,
			approver: e.approver,
			name: e.name,
			date: e.date,
			description: e.description,
			reviewer: e.reviewer,
			file: file[0],
		});
		setError(!result.ok);
		setBusy(false);

		if (result.ok) {
			//finally, clear out the fields in the popup and close it.
			const updated: Evidence = {
				approver: e.approver,
				comments: e.comments,
				date: e.date.toDateString(),
				description: e.description,
				id: new Date().getTime().toString(),
				name: file[0].name,
				reviewer: e.reviewer,
			};
			setIsOpen(false);
			resetAllFields();
			onClose(updated);
		}
	};

	const resetAllFields = () => {
		resetField('name');
		resetField('date');
		resetField('description');
		resetField('reviewer');
		resetField('comments');
		resetField('approver');
		resetField('file');
	};

	const onError = (e: any) => {
		const err: EvidenceFormError = {
			any: true,
			approver: !!e.approver,
			comments: !!e.comments,
			date: !!e.date,
			description: !!e.description,
			name: !!e.name,
			reviewer: !!e.reviewer,
			evidenceFile: !!e.evidenceFile,
		};
		setFormError(err);
		setIsOpen(true);
	};

	const getUpdatedEvidence = (): Evidence => ({
		approver,
		comments,
		date,
		description,
		id,
		name,
		reviewer,
	});

	const onDismiss = () => {
		setIsOpen(false);
		resetAllFields();
		onClose({ ...getUpdatedEvidence() });
	};

	return {
		isOpen,
		busy,
		formError,
		register,
		error,
		onDismiss,
		onSubmit: handleSubmit(onSubmit, onError),
	};
};

export default useEvidence;
