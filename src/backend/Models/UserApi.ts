import { Organization } from './OrganizationApi';

export interface User {
	is_super_admin: boolean;
	email: string;
	id: number;
}

export interface UserResult {
	user?: User;
	organizations?: Organization[];
}
