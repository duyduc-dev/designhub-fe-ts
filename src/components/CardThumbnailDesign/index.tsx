import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@/constants/index.ts';
import { dynamicRoute } from '@/utils/helpers.ts';

import style from './style.module.scss';
import { DesignDetailResponse } from '@/services/type/design.ts';

type Props = {
  item: DesignDetailResponse;
};

const CardThumbnailDesign = ({ item }: Props) => {
  const { t } = useTranslation();

  return (
    <Link
      to={dynamicRoute(AppRoutes.DESIGN, { id: item.id })}
      className={style.wrapper}
    >
      <div className={style.thumbnail}></div>
      <div className={style.content}>
        <p className={style.titleDesign}>{item.title || t`untitledDesign`}</p>
        <p className={style.description}>
          {item.width}
          {item.unit} x {item.height}
          {item.unit}
        </p>
      </div>
    </Link>
  );
};

export default CardThumbnailDesign;
