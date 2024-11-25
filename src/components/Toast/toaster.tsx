import { Id, toast as toastify } from 'react-toastify';

import Toast from '@/components/Toast/index.tsx';
import { HttpResponse } from '@/http/type.ts';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  LOADING = 'spinner',
}

export type ToastId = Id;
const toastSet = new Set<Id>();
const MAX_TOAST = 5;

export type ToasterProps = {
  title?: string;
  message?: string;
  keepToast?: boolean;
  onClose?: () => void;
  type?: ToastType;
  duration?: number;
  useTranslate?: boolean;
};

export default function toaster(props: ToasterProps) {
  const { keepToast = false, onClose, type, duration = 5000 } = props;
  if (toastSet.size >= MAX_TOAST) {
    const toastId: Id = [...toastSet][0];
    toaster.close(toastId);
  }
  let toastID: Id = -1;

  const handleCloseToast = () => {
    toastID = -1;
    onClose?.();
  };

  toastID = toastify(<Toast {...props} />, {
    onClose: handleCloseToast,
    closeButton: false,
    isLoading: type === ToastType.LOADING || keepToast,
    autoClose: duration,
  });

  return {
    id: toastID,
    remove: () => toastify.dismiss(toastID),
  };
}

toaster.close = function (id: Id) {
  toastify.dismiss(id);
};

toaster.closeAll = function (list = []) {
  list.forEach((item) => toaster.close(item));
};

toaster.catchError = function (error: HttpResponse) {
  this({
    useTranslate: true,
    title: 'errorOccurred',
    message: `error:${error.description}`,
    type: ToastType.ERROR,
  });
};

export { toaster };
