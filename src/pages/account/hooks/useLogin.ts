import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData } from '../common/LoginData';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AppRoute, AppRoutes } from 'appConstants';
import { useUser } from 'hooks';
import { User, UserRoles } from 'types';
import { translationNs } from '../common/constants';
import { mfa } from 'backend';

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
            mfa_token : yup.string().required(t('login.error.mfa'))
		})
	);

	const onSubmit = async (data: LoginData) => {
		setLoading(true);
		const SessionLogin = sessionStorage.getItem("LoginData");
		const Session = SessionLogin !== null ? JSON.parse(SessionLogin) : "";
		data.email = Session.email;
		data.password = Session.password;
		const { ok } = await mfa({ ...data });
		if ( sessionStorage.errorKey ){
			const error = JSON.parse(sessionStorage['errorKey']);
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
		redirectUrl,
		success,
		loading,
		schemaResolver,
		onSubmit,
	};
};

export default useLogin;
