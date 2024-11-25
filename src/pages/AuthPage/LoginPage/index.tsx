import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import AppButton, { ButtonVariant } from '@/components/Button/index.tsx';
import { GoogleIcon } from '@/components/icon/index.ts';
import LoginEmailButton from '@/pages/AuthPage/partials/LoginEmailButton';
import SessionLoginContainer from '@/pages/AuthPage/partials/SessionLoginContainer';
import authApi from '@/services/auth.ts';
import authStore from '@/stores/auth/AuthStore.ts';

import style from './style.module.scss';

const LoginPage = () => {
  const { t } = useTranslation();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await authApi.googleLogin(tokenResponse.access_token);
        if (res.accessToken) authStore.setAccessToken(res.accessToken);
      } catch (e) {
        console.log('useGoogleLogin', e);
      }
    },
    onError: (e) => {
      console.log('ERROR', e);
    },
  });

  // useGoogleOneTapLogin({
  //   onSuccess: async (credentialResponse) => {
  //     console.log('credentialResponse', credentialResponse);
  //     const res = await authApi.googleOneTapLogin(
  //       credentialResponse.credential,
  //     );
  //     authStore.setAccessToken(res.accessToken);
  //   },
  // });

  return (
    <div className={clsx(style.container, 'animate__animated animate__zoomIn')}>
      <SessionLoginContainer
        title={t`signInOrSignUpNow`}
        description={t`signInOrSignUpNowDesc`}
        className={clsx(style.wrapperButton)}
      >
        <AppButton
          fullWidth
          startIcon={<GoogleIcon />}
          variant={ButtonVariant.OUTLINED}
          className={style.btnLoginAction}
          onClick={() =>
            login({
              prompt: 'select_account',
            })
          }
        >
          <p>{t`continueWithGoogle`}</p>
        </AppButton>
        <LoginEmailButton className={style.btnLoginAction} />
      </SessionLoginContainer>
    </div>
  );
};

export default observer(LoginPage);
