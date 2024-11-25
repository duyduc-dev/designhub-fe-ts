import { useTranslation } from 'react-i18next';

import AppInputSearch from '@/components/Input/AppInputSearch.tsx';
import Shapes from '@/layouts/DesignLayout/partials/SidebarElement/Shapes/index.tsx';
import SidebarWrapper from '@/layouts/DesignLayout/partials/SidebarWrapper';

import styles from './style.module.scss';

const SidebarElement = () => {
  const { t } = useTranslation();

  return (
    <SidebarWrapper label={t`elements`} showIconClose>
      <AppInputSearch fullWidth placeholder={t`searchElements`} />

      <div className={styles.elementShapes}>
        <Shapes />
      </div>
    </SidebarWrapper>
  );
};

export default SidebarElement;
