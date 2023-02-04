import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData } from '../common/LoginData';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AppRoute, AppRoutes } from 'appConstants';
import { useUser } from 'hooks';
import { User, UserRoles } from 'types';
import { translationNs } from '../common/constants';
import { login } from 'backend';

const useLogin = () => {
	const { t } = useTranslation(translationNs);

	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [fail,setFail] = useState<boolean>(false);
	const [redirectUrl] = useState<AppRoute>(AppRoutes.Dashboard);
	const [mfarequireUrl] = useState<AppRoute>(AppRoutes.MfaRequire);
	const { setUser } = useUser();

	const schemaResolver = yupResolver(
		yup.object().shape({
			email: yup.string().required(t('login.error.userName')),
			password: yup.string().required(t('login.error.password')),
		})
	);

	const onSubmit = async (data: LoginData) => {
		setLoading(true);
		const { ok } = await login({ ...data });
		if ( sessionStorage.errorKey ){
			const error = JSON.parse(sessionStorage['errorKey']);
			sessionStorage.removeItem("LoginData");
			sessionStorage.setItem("LoginData",JSON.stringify(data));
			const errorStr = error.error;
			if ( errorStr.search("MFA is required for this user") >= 0 ){
				setFail(true);
			}
			sessionStorage.removeItem("errorKey");
		} else {
			const user: User = {
				userName: data.email,
				roles: [UserRoles.Auditor]
			};
			setUser(user);
			setSuccess(ok);
		}
		setLoading(false);
		return ok;
	};

	return {
		mfarequireUrl,
		redirectUrl,
		success,
		fail,
		loading,
		schemaResolver,
		onSubmit,
	};
};

export default useLogin;
