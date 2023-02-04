export enum UserRoles {
	Any = 1,
	Auditor = 2,
}

export type User = {
	userName: string;
	title?: string;
	roles: UserRoles[];
};
