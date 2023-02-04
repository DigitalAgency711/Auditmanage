import { useEffect, useState } from 'react';
import { Client } from '../../common/Types';
import { getAllClients } from 'backend';
import { Client as ApiClient } from 'backend/Models';

const mapApiResponse = (e: ApiClient): Client => ({
	clientId: e.id,
	description: e.data.description,
	name: e.name,
	orgId: e.OrganizationId,
});

const useClientTable = (orgId: number, newClient?: Client) => {
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [data, setData] = useState<Client[]>();

	const setBlank = () => {
		setData([]);
	};

	useEffect(() => {
		setBusy(true);

		getAllClients(orgId)
			.then(result => {
				setError(!result.ok);

				if (result.ok && result.data) {
					const clients = result.data;
					const mapped = clients.data.map(mapApiResponse);
					setData(mapped);
				} else {
					setBlank();
				}
				setBusy(false);
			})
			.catch(() => {
				setBlank();
				setBusy(false);
			});
		return () => setData([]);
	}, [orgId, newClient]);

	useEffect(() => {
		setEmpty((data?.length ?? 0) === 0);
	}, [data]);

	return {
		empty,
		busy,
		error,
		data,
	};
};

export default useClientTable;
