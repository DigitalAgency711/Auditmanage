import { FormInput, VerticalForm, WhiteGrowingSpinner } from 'components';
import { LoginData } from '../common/LoginData';
import { useTranslation } from 'react-i18next';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { AppRoutes } from 'appConstants';
import { translationNs } from '../common/constants';

const Login = () => {
	const { t } = useTranslation(translationNs);
	const { mfarequireUrl,redirectUrl, success,fail, loading, schemaResolver, onSubmit } = useLogin();
	return (
		<>
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
								type="email"
								name="email"
								placeholder={t('login.userName')}
								labelClassName="ml-2"
								containerClass="mb-3"
							/>
							<FormInput
								label={t('Password')}
								type="password"
								name="password"
								placeholder={t('login.password')}
								labelClassName="ml-2"
								containerClass="mb-3"
							/>
							<h6>
								<Link to = {AppRoutes.ForgetPassword.Full()}>
									Forgot password ?
								</Link>
							</h6>
							<div className="mb-3 mb-0 text-center">
								<Button variant="primary" type="submit" disabled={loading}>
									{loading && <WhiteGrowingSpinner />}
									{t('login.loginBtn')}
								</Button>
								{success && <Navigate to={redirectUrl.full ?? ''} />}
								{fail && <Navigate to ={mfarequireUrl.full ?? ''} />}
							</div>
							<div className='mb-3'>
								<h6>Do you have account? If you don't have account Click 
									<Link to = {AppRoutes.Register.Full()}>
										&nbsp;&nbsp;Register
									</Link>
								</h6>
							</div>
						</VerticalForm>
					</div>
				</Card.Body>
			</Card>
		</>
	);
};

export default Login;
