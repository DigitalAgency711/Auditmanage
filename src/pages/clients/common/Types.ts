export interface Client {
	clientId?: number;
	orgId: number;
	name: string;
	description: string;
}

export type ClientCreatedHandler = (clientId: Client) => void;

export interface CreateProps {
	onAdded: ClientCreatedHandler;
	orgId: number;
}

export interface ListProps {
	newClient?: Client;
	orgId: number;
}
