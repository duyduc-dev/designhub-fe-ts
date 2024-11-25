import AppModal from '@/components/Modal/index.tsx';
import FormLogin from '@/pages/AuthPage/partials/LoginEmailButton/FormLogin.tsx';

import style from './style.module.scss';

type Props = { visible: boolean; onClose: () => void };

const LoginEmailModal = ({ visible, onClose }: Props) => {
  const handleClose = () => {
    onClose?.();
  };
  return (
    <AppModal
      closeOnClickOverlay={false}
      visible={visible}
      containerClassName={style.wrapperModal}
      onClose={handleClose}
    >
      <FormLogin onClose={handleClose} />
    </AppModal>
  );
};

export default LoginEmailModal;
