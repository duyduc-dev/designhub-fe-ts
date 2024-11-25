import { useTranslation } from 'react-i18next';

import { templateShape } from '@/layouts/DesignLayout/partials/SidebarElement/Shapes/templateShape.tsx';
import WrapperElement from '@/layouts/DesignLayout/partials/SidebarElement/WrapperElement';

import style from './style.module.scss';

const Shapes = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h5 className={style.heading}>{t`shapes`}</h5>
      <div className={style.listShape}>
        {templateShape.map((item, index) => (
          <WrapperElement key={`${index}`} shape={item}>
            {item.element}
          </WrapperElement>
        ))}
      </div>
    </div>
  );
};

export default Shapes;
