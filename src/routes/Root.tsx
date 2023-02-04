import { Navigate } from 'react-router-dom';
import { AppRoutes } from 'appConstants';

const Root = () => {
	return <Navigate to={AppRoutes.Landing.Full()} />;
};

export default Root;
