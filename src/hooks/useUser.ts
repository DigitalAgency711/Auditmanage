import { User, UserRoles } from 'types';

const userKey = 'currentUser';

const setUser = (user: User) => {
	sessionStorage.setItem(userKey, JSON.stringify(user));
};

const clearUser = () => {
	sessionStorage.removeItem(userKey);
};

const getUser = (): User | null => {
	let user: User | null = null;

	try {
		const serialized = sessionStorage.getItem(userKey);
		if (serialized) {
			user = JSON.parse(serialized ?? '');
		}
	} catch (e) {
		console.error('Could not parse user object', e);
	}
	return user;
};

export default function useUser() {
	const isAuthenticated = true;

	const dummyUser: User = {
		userName: 'John Doe',
		title: 'Auditor',
		roles: [UserRoles.Any, UserRoles.Auditor],
	};

	return { isAuthenticated, user: dummyUser, getUser, setUser, clearUser };
}
