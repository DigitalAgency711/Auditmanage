import React from 'react';

const Hero = React.lazy(() => import('./controls/Hero'));
const Login = React.lazy(() => import('./controls/Login'));
const Footer = React.lazy(() => import('./controls/Footer'));

const LoginLanding = () => {
	return (
		<>
			<Hero>
				<Login />
			</Hero>
			<Footer />
		</>
	);
};

export default LoginLanding;
