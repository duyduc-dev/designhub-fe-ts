import clsx from 'clsx';
import { Scaling } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppButton, { ButtonVariant } from '@/components/Button/index.tsx';
import CustomDesign, {
  DesignType,
} from '@/components/ChooseDesignTemplateModal/CustomDesign.tsx';
import AppModal from '@/components/Modal/index.tsx';

import style from './style.module.scss';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const ChooseDesignTemplateModal = ({ visible, onClose }: Props) => {
  const { t } = useTranslation();

  const [type, setType] = useState(DesignType.CUSTOM_SIZE);

  return (
    <AppModal
      visible={visible}
      onClose={onClose}
      containerClassName={style.container}
    >
      <div className={style.inner}>
        <div className={style.left}>
          <p className={style.logo}>{t`createADesign`}</p>
          <AppButton
            fullWidth
            className={clsx(style.btnSelectType, style.btnSelectTypeSelected)}
            variant={ButtonVariant.TEXT}
            onClick={() => setType(DesignType.CUSTOM_SIZE)}
          >
            <Scaling strokeWidth={1.5} size={20} />
            <span className={style.title}>{t`customSize`}</span>
          </AppButton>
        </div>
        <div className={style.contentDesignType}>
          <CustomDesign type={type} />
        </div>
      </div>
    </AppModal>
  );
};

export default ChooseDesignTemplateModal;
