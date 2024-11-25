import Avatar from '@mui/material/Avatar';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import toaster, { ToastType } from '@/components/Toast/toaster.tsx';
import authStore from '@/stores/auth/AuthStore.ts';

import style from './style.module.scss';

const ProfilePopup = () => {
  const { t } = useTranslation();

  const profileAction = [
    {
      title: 'settings',
      onClick: () => {},
    },
    {
      title: 'signOut',
      onClick: () => {
        authStore.signOut();
        toaster({
          title: t`loggedOutSuccessfully`,
          message: t`youHaveBeenLoggedOutSeeYouAgainSoon`,
          type: ToastType.SUCCESS,
        });
      },
    },
  ];

  return (
    <div className={style.containerProfilePopup}>
      <div className={style.wrapperHeader}>
        <Avatar
          alt={authStore.currentUser?.fullName}
          src={authStore.currentUser?.avatar}
          sx={{ width: 64, height: 64 }}
        />
        <div className={style.headInfo}>
          <p className={style.userTitle}>{authStore.currentUser?.fullName}</p>
          <p className={style.subTitle}>{authStore.currentUser?.email}</p>
        </div>
      </div>
      <div className={style.separator}></div>
      <div className={style.containerListAction}>
        {profileAction.map((item) => (
          <button
            type="button"
            onClick={item.onClick}
            key={item.title}
            className={style.itemAction}
          >
            {t(item.title)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default observer(ProfilePopup);
