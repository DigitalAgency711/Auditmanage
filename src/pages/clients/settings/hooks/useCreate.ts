import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Client, ClientCreatedHandler } from '../../common/Types';
import { useState } from 'react';
import { addClient as addClientApi } from 'backend';

const validators = {
	name: yup.string().required(),
	description: yup.string().required(),
};

export interface ClientCreateError {
	name: boolean;
	description: boolean;
}

const noError: ClientCreateError = {
	name: false,
	description: false,
};

const useCreate = (onAdded: ClientCreatedHandler, orgId: number): any => {
	const schema = yup.object().shape(validators);
	const { register, handleSubmit, resetField } = useForm<Client>({
		resolver: yupResolver(schema),
	});
	const [error, setError] = useState(false);
	const [formError, setFormError] = useState<ClientCreateError>(noError);
	const [busy, setBusy] = useState<boolean>(false);
	const onSubmit = async (e: any) => {
		//for now, 0 as the default orgId is enough
		setFormError(noError);
		setBusy(true);
		console.log("e:", e);

		const result = await addClientApi(orgId, e.name, e.description);
		console.info('got from client', result);
		setError(!result.ok);
		if (result.ok) {
			const newClient: Client = {
				description: e.description,
				name: e.name,
				orgId: orgId,
				clientId: result.data,
			};
			onAdded(newClient);
		}

		resetField('name');
		resetField('description');
		setBusy(false);
	};
	const onError = async (e: any) => {
		let err: ClientCreateError = {
			name: !!e.name,
			description: !!e.description,
		};
		setFormError(err);
	};

	return {
		busy,
		error,
		formError,
		register,
		onSubmit: handleSubmit(onSubmit, onError),
	};
};
export default useCreate;
