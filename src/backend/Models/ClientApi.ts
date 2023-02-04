export interface Client {
	id: number;
	name: string;
	data: { description: string };
	createdAt: string;
	updatedAt: string;
	OrganizationId: number;
	draw: boolean;
}

export interface Result {
	success: boolean;
	recordsTotal: number;
	recordsFiltered: number;
	data: Client[];
}

export interface CreateResponse {
	client_id: number;
	org_id: number;
	success: boolean;
}
