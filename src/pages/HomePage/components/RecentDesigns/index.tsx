import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CardThumbnailDesign from '@/components/CardThumbnailDesign/index.tsx';
import toaster from '@/components/Toast/toaster.tsx';
import { HttpResponse } from '@/http/type.ts';
import designApi from '@/services/design.ts';
import { DesignDetailResponse } from '@/services/type/design.ts';

import style from './style.module.scss';

const RecentDesigns = () => {
  const { t } = useTranslation();
  const [recentDesign, setRecentDesign] = useState<DesignDetailResponse[]>([]);

  const fetchRecentDesigns = async () => {
    try {
      const res = await designApi.fetchRecentDesign();
      setRecentDesign(res);
    } catch (e) {
      toaster.catchError(e as HttpResponse);
    }
  };

  useEffect(() => {
    fetchRecentDesigns();
  }, []);

  return (
    <div className={style.container}>
      <p className={style.label}>{t`recentDesigns`}</p>
      <div className={style.listDesign}>
        {recentDesign.map((item) => (
          <CardThumbnailDesign key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentDesigns;
