import { Modal } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import clsx from 'clsx';

import style from './style.module.scss';
import { ReactNode } from 'react';

type Props = {
  visible: boolean;
  onClose: () => void;
  containerClassName?: string;
  children?: ReactNode;
  closeOnClickOverlay?: boolean;
};

const AppModal = ({
  visible,
  onClose,
  containerClassName,
  children,
  closeOnClickOverlay = true,
}: Props) => {
  return (
    <Modal open={visible} onClose={onClose}>
      <Zoom tabIndex={-1} in={visible}>
        <div className={style.container}>
          <div
            className={style.overlay}
            onClick={closeOnClickOverlay ? onClose : undefined}
          ></div>
          <div tabIndex={-1} className={clsx(style.inner, containerClassName)}>
            {children}
          </div>
        </div>
      </Zoom>
    </Modal>
  );
};

export default AppModal;
