import { FormInput, VerticalForm, WhiteGrowingSpinner } from 'components';
import React from 'react';
import { LoginData } from './common/LoginData';
import { useTranslation } from 'react-i18next';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import useLogin from './hooks/useLogin';
import { AppRoutes } from 'appConstants';
import { translationNs } from './common/constants';
const Hero = React.lazy(() => import('./controls/Hero'));
const Footer = React.lazy(() => import('./controls/Footer'));

const Login = () => {
	const { t } = useTranslation(translationNs);
	const { redirectUrl, success, loading, schemaResolver, onSubmit } = useLogin();
	console.log()
	return (
		<>
			<Hero>
				<Card>
					<Card.Body>
						<div className="text-center w-75 m-auto">
							<h2 className="text-muted mb-4">
								{t('TalaAudit')}
							</h2>
						</div>
						<div>
							<VerticalForm<LoginData>
								onSubmit={onSubmit}
								resolver={schemaResolver}>
								<FormInput
									label={t('Email')}
									type="hidden"
									name="email"
									placeholder={t('login.userName')}
									labelClassName="ml-2"
									containerClass="mb-3"
								/>
								<FormInput
									label={t('Password')}
									type="hidden"
									name="password"
									placeholder={t('login.password')}
									labelClassName="ml-2"
									containerClass="mb-3"
								/>
								<FormInput
									label={t('MFA authuntication')}
									type="text"
									name="mfa_token"
									placeholder={t('XXXXXX')}
									labelClassName="ml-2"
									containerClass="mb-3"
								/>
								<div className="mb-3 mb-0 text-center">
									<Button variant="primary" type="submit" disabled={loading}>
										{loading && <WhiteGrowingSpinner />}
										{t('Verify')}
									</Button>
									{success && <Navigate to={redirectUrl.full ?? ''} />}
								</div>
								<div className='mb-3'>
									<h6>
										Open the two-factor authenticator (TOTP) app on your mobile device to view your authentication code.
									</h6>
								</div>
							</VerticalForm>
						</div>
					</Card.Body>
				</Card>
			</Hero>
			<Footer></Footer>
		</>
	);
};

export default Login;
