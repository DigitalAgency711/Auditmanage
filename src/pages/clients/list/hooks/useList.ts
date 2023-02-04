import { Client, ClientCreatedHandler } from '../../common/Types';
import { useState } from 'react';

const useList = () => {
	const [orgId] = useState(0); //use default org id for now
	const [newClient, setNewClient] = useState<Client | undefined>();

	const onAdded: ClientCreatedHandler = (e: Client) => {
		console.info('created client', e.clientId ?? -1);
		setNewClient(e);
	};

	return {
		orgId,
		onAdded,
		newClient,
	};
};

export default useList;
