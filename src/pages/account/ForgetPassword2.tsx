import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VerticalForm, FormInput } from 'components';
import AccountLayout2 from './AccountLayout2';
import { useForgetPassword } from './hooks';

export type ResetData = {
    email : string,
    old_password : string,
    password : string,
    user_data : {
        name : string,
        company : string
    }
};
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('Back to')}{' '}
                <Link to={'/account/login2'} className="text-muted ms-1">
                    <b>{t('Log In')}</b>
                </Link>
            </p>
        </footer>
    );
};

const ForgetPassword2 = () => {
    const { t } = useTranslation();
    const { loading, passwordReset, resetPasswordSuccess, error, schemaResolver, onSubmitForget,onSubmitReset } = useForgetPassword();
    console.log(JSON.parse(sessionStorage.sessionUser));

    return (
        <AccountLayout2 bottomLinks={<BottomLink />}>
            <h4 className="mt-0">{t('Set new password')}</h4>
            <p className="text-muted mb-4">
                {t("Please input new password. Passwords must be at leat 7 characters long, mush use digits[0-9], upper and lower case characters, and special")}
            </p>

            {resetPasswordSuccess && <Alert variant="success">{resetPasswordSuccess.message}</Alert>}

            {error && !resetPasswordSuccess && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}

            {!passwordReset && (
                <VerticalForm<ResetData> onSubmit={onSubmitReset} resolver={schemaResolver}>
                    <FormInput
                        label={t('New Password')}
                        type="text"
                        name="password"
                        placeholder={t('new password')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Re-enter')}
                        type="text"
                        name="passwordtwo"
                        placeholder={t('confirm password')}
                        containerClass={'mb-3'}
                    />

                    <div className="mb-0 text-center d-grid">
                        <Button variant="primary" type="submit" disabled={loading}>
                            <i className="mdi mdi-lock-reset"></i> {t('Reset Password')}
                        </Button>
                    </div>
                </VerticalForm>
            )}
        </AccountLayout2>
    );
};

export default ForgetPassword2;
