import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AppButton from '@/components/Button/index.tsx';
import ChooseDesignTemplateModal from '@/components/ChooseDesignTemplateModal';
import { AppRoutes } from '@/constants/index.ts';

import style from './style.module.scss';

const NavbarContent = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);

  return (
    <aside className={style.container}>
      <Link to={AppRoutes.ROOT} className={style.logo}>
        DesignHub
      </Link>
      <AppButton
        className={style.btnCreateDesign}
        startIcon={<Plus strokeWidth={2.5} size={18} />}
        onClick={() => setVisible(true)}
      >
        {t`createADesign`}
      </AppButton>

      <ChooseDesignTemplateModal
        visible={visible}
        onClose={() => setVisible(false)}
      >
        213
      </ChooseDesignTemplateModal>
    </aside>
  );
};

export default NavbarContent;
