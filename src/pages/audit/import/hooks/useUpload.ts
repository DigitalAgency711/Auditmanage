import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Questionnaire, UploadProps } from '../common/PropTypes';
import { create as api } from 'backend';

const validators = {
	name: yup.string().required(),
	file: yup.mixed().notRequired(),
	version: yup.number().required().positive().integer(),
	auditYear: yup.number().required().positive().integer(),
};

type UploadError = {
	name: boolean;
	version: boolean;
	auditYear: boolean;
	csvFile: boolean;
};

const noError: UploadError = {
	name: false,
	auditYear: false,
	version: false,
	csvFile: false,
};

const useUpload = ({ onUploaded, orgId }: UploadProps) => {
	const schema = yup.object().shape(validators).required();
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(false);
	const [formError, setFormError] = useState(noError);
	const { register, handleSubmit, resetField } = useForm<Questionnaire>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (e: any) => {
		const file: FileList = e.csvFile;
		if (file?.length !== 1) {
			let err: UploadError = {
				name: false,
				version: false,
				auditYear: false,
				csvFile: true,
			};
			setFormError(err);
			return;
		}

		setBusy(true);

		const result = await api(
			e.name,
			e.auditYear,
			e.version,
			e.csvFile[0],
			orgId
		);
		if (result.ok) {
			resetField('name');
			resetField('version');
			resetField('auditYear');
			resetField('csvFile');
			onUploaded(result.data ?? -1);
		} else {
			setError(true);
		}

		setBusy(false);
	};
	const onError = async (e: any) => {
		let err: UploadError = {
			name: !!e.name,
			version: !!e.version,
			auditYear: !!e.auditYear,
			csvFile: !!e.csvFile,
		};
		setFormError(err);
	};

	const onReset = () => setError(false);

	return {
		busy,
		error,
		formError,
		register,
		onReset,
		onSubmit: handleSubmit(onSubmit, onError),
	};
};

export default useUpload;
