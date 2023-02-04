import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from 'hooks';
import { AppRoutes } from 'appConstants';
import { UserRoles } from 'types';

type PrivateRouteProps = {
	component: React.ComponentType;
	roles?: UserRoles[];
};

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({
	component: RouteComponent,
	roles,
	...rest
}: PrivateRouteProps) => {
	let location = useLocation();
	const { isAuthenticated, user } = useUser();

	/**
	 * not logged in so redirect to login page with the return url
	 */
	if (!isAuthenticated) {
		return (
			<Navigate to={AppRoutes.Root.Full()} state={{ from: location }} replace />
		);
	}

	const pred = (x: UserRoles): boolean => user.roles.indexOf(x) < 0;
	const found = roles && roles.length > 0 && roles.some(pred);

	if (found) {
		// check if route is restricted by role
		// role not authorised so redirect to home page
		return <Navigate to={{ pathname: '/' }} />;
	}

	return <RouteComponent />;
};

export default PrivateRoute;
