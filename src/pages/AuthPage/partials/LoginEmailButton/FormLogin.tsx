import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AppButton from '@/components/Button/index.tsx';
import GroupInput from '@/components/Input/GroupInput.tsx';
import AppInput from '@/components/Input/index.tsx';
import AppInputLabel from '@/components/Input/InputLabel.tsx';
import toaster from '@/components/Toast/toaster.tsx';
import { HttpResponse } from '@/http/type.ts';
import yup from '@/libs/yup.ts';
import SessionLoginContainer from '@/pages/AuthPage/partials/SessionLoginContainer';
import authApi from '@/services/auth.ts';
import { AuthStep, JwtPayloadDecoded } from '@/services/type/auth.ts';
import authStore from '@/stores/auth/AuthStore.ts';

import style from './style.module.scss';

type Props = {
  onClose: () => void;
};

const FormLogin = ({ onClose }: Props) => {
  const { t } = useTranslation();

  const previousStep = useRef(AuthStep.EMAIL);
  const [currentStep, setCurrentStep] = useState<AuthStep>(AuthStep.EMAIL);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    name:
      currentStep === AuthStep.NAME ? yup.string().required() : yup.string(),
    otp: currentStep === AuthStep.OTP ? yup.string().required() : yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      otp: '',
    },
  });

  const handleClose = () => {
    onClose?.();
  };

  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      const { email, name, otp } = values;
      setIsLoading(true);
      const res = await authApi.login({
        type: currentStep,
        email: email,
        name: currentStep === AuthStep.NAME ? name || undefined : undefined,
        otp: currentStep === AuthStep.OTP ? otp || undefined : undefined,
      });
      setIsLoading(false);
      if (res.nextStep) {
        setCurrentStep(res.nextStep);
      }

      switch (currentStep) {
        case AuthStep.EMAIL: {
          previousStep.current = AuthStep.EMAIL;
          break;
        }
        case AuthStep.NAME:
          previousStep.current = AuthStep.NAME;
          break;
        case AuthStep.OTP: {
          if (res.accessToken) {
            authStore.setAccessToken(res.accessToken);
            const decoded = jwtDecode<JwtPayloadDecoded>(res.accessToken);
            console.log('decoded', decoded);
            toaster({
              title: t`loginSuccessful`,
              message: t('hiYouHaveLoggedInSuccessfully', {
                name: decoded?.fullName ?? '',
              }),
            });
          }
          handleClose();
          break;
        }
      }
    } catch (e) {
      console.log('~ handleSubmitForm', e);
      toaster.catchError(e as HttpResponse);
      setIsLoading(false);
    }
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmitForm(e);
        console.log('LOAD');
      }}
    >
      {currentStep === AuthStep.EMAIL && (
        <SessionLoginContainer
          showIconBack
          onClickBack={handleClose}
          title={t`continueWithEmail`}
          description={t`continueWithEmailDesc`}
          containerClassName={clsx(style.wrapper)}
        >
          <GroupInput>
            <AppInputLabel>{t`email`}</AppInputLabel>
            <AppInput
              error={!!errors.email?.message}
              {...register('email')}
              helperText={errors.email?.message}
              fullWidth
            ></AppInput>
          </GroupInput>
          <AppButton
            type="submit"
            loading={isLoading}
            fullWidth
            className={style.btnContinue}
          >
            {t`continue`}
          </AppButton>
        </SessionLoginContainer>
      )}
      {currentStep === AuthStep.NAME && (
        <SessionLoginContainer
          showIconBack
          onClickBack={() => setCurrentStep(AuthStep.EMAIL)}
          title={t`createYourAccount`}
          description={t('createYourAccountDesc', {
            email: getValues('email'),
          })}
          containerClassName={style.wrapper}
        >
          <GroupInput>
            <AppInputLabel>{t`name`}</AppInputLabel>
            <AppInput
              error={!!errors.name?.message}
              {...register('name')}
              helperText={errors.name?.message}
              fullWidth
            ></AppInput>
          </GroupInput>
          <AppButton
            type="submit"
            loading={isLoading}
            fullWidth
            className={style.btnContinue}
          >
            {t`continue`}
          </AppButton>
        </SessionLoginContainer>
      )}
      {currentStep === AuthStep.OTP && (
        <SessionLoginContainer
          showIconBack
          onClickBack={() => {
            setCurrentStep(previousStep.current);
          }}
          title={
            previousStep.current === AuthStep.NAME
              ? t`youAlmostSignedUp`
              : t`finishLoggingIn`
          }
          description={t(
            previousStep.current === AuthStep.NAME
              ? 'enterOTPDesc'
              : 'finishLoggingInDesc',
            { email: getValues('email') },
          )}
          containerClassName={style.wrapper}
        >
          <GroupInput>
            <AppInputLabel>{t`otp`}</AppInputLabel>
            <AppInput
              error={!!errors.otp?.message}
              {...register('otp')}
              helperText={errors.otp?.message}
              fullWidth
            ></AppInput>
          </GroupInput>
          <AppButton
            type="submit"
            loading={isLoading}
            fullWidth
            className={style.btnContinue}
          >
            {t`continue`}
          </AppButton>
        </SessionLoginContainer>
      )}
    </form>
  );
};

export default observer(FormLogin);
