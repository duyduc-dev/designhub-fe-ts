import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { ChevronDown } from 'lucide-react';
import { observer } from 'mobx-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AppButton, { ButtonVariant } from '@/components/Button/index.tsx';
import ProfilePopup from '@/components/HeaderProfileButton/ProfilePopup.tsx';
import Popover, { AppPopoverRef } from '@/components/Popover/index.tsx';
import { AppRoutes } from '@/constants/index.ts';
import authStore from '@/stores/auth/AuthStore.ts';

import style from './style.module.scss';

const HeaderProfileButton = () => {
  const { t } = useTranslation();
  const popoverRef = useRef<AppPopoverRef>(null);
  const navigate = useNavigate();

  if (!authStore.accessToken) {
    return (
      <AppButton
        onClick={() => navigate(AppRoutes.AUTH)}
        variant={ButtonVariant.OUTLINED}
        className={style.btnSignIn}
      >
        {t`signIn`}
      </AppButton>
    );
  }

  return (
    <Popover
      ref={popoverRef}
      onClickOutside={() => popoverRef.current?.close()}
      render={<ProfilePopup />}
      placement="bottom-end"
    >
      <AppButton
        disableRipple
        variant={ButtonVariant.TEXT}
        onClick={() => popoverRef.current?.open()}
        className={style.btnContainer}
      >
        <div className={style.container}>
          <div>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              // badgeContent={
              //   <Avatar
              //     alt="Remy Sharp"
              //     sx={{ width: 16, height: 16 }}
              //     src="/static/images/avatar/1.jpg"
              //   />
              // }
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={authStore.currentUser?.fullName}
                src={authStore.currentUser?.avatar}
              />
            </Badge>
          </div>
          <div>
            <p>{authStore.currentUser?.fullName}</p>
            <p>{authStore.currentUser?.email}</p>
          </div>
          <ChevronDown strokeWidth={2.5} size={16} />
        </div>
      </AppButton>
    </Popover>
  );
};

export default observer(HeaderProfileButton);
