import clsx from 'clsx';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Icons } from 'react-toastify';

import { ToastType } from '@/components/Toast/toaster';
import { AppColors } from '@/constants';
import { firstLetterUpperCase } from '@/utils/helpers';

import style from './toast.module.scss';

import { ToasterProps } from './toaster';

const Toast = (props: ToasterProps) => {
  const { type = ToastType.SUCCESS, message, title, useTranslate } = props;

  const { t } = useTranslation();

  const Icon = Icons?.[type] || Icons.success;

  const trans = useTranslate ? t : (str: string) => str;

  return (
    <div className={clsx(style.container, message && style.hasMessage)}>
      <div className={style.wrapperIcon}>
        <Icon width={16} height={16} type={type as 'success'} theme={'light'} />
      </div>
      <div className={style.contentWrapper}>
        {title && (
          <p className={style.title}>{firstLetterUpperCase(trans(title))}</p>
        )}
        {message && <p className={style.message}>{trans(message)}</p>}
      </div>
      <div className={style.wrapperCloseIcon}>
        <button tabIndex={-1} type="button">
          <X color={AppColors.neutral['600']} size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
