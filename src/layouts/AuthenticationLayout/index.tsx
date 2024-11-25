import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from '@/constants/index.ts';
import authStore from '@/stores/auth/AuthStore.ts';

import style from './style.module.scss';

const AuthenticationLayout = () => {
  const { t } = useTranslation();

  if (authStore.accessToken) {
    return <Navigate to={AppRoutes.ROOT} />;
  }

  return (
    <div className={style.container}>
      <div>
        <div>
          <p className={style.logo}>DesignHub</p>
          <span className={style.hint}>{t`followYourStyle`}</span>
        </div>
      </div>
      <div className={style.content}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default observer(AuthenticationLayout);
