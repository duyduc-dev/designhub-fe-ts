import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppButton, { ButtonVariant } from '@/components/Button/index.tsx';
import LoginEmailModal from '@/pages/AuthPage/partials/LoginEmailButton/LoginEmailModal.tsx';

type Props = {
  className?: string;
};

const LoginEmailButton = ({ className }: Props) => {
  const { t } = useTranslation();

  const [visibleModal, setVisibleModal] = useState(false);

  const handleCloseModal = () => setVisibleModal(false);
  const handleOpenModal = () => setVisibleModal(true);

  return (
    <>
      <AppButton
        fullWidth
        startIcon={<Mail size={20} />}
        variant={ButtonVariant.OUTLINED}
        className={className}
        onClick={handleOpenModal}
      >
        <p>{t`continueWithEmail`}</p>
      </AppButton>
      <LoginEmailModal visible={visibleModal} onClose={handleCloseModal} />
    </>
  );
};

export default LoginEmailButton;
