import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppButton from '@/components/Button';
import AppInputSearch from '@/components/Input/AppInputSearch.tsx';
import DesignHelper from '@/helpers/DesignHelper.ts';
import SidebarWrapper from '@/layouts/DesignLayout/partials/SidebarWrapper';
import mediaContentApi from '@/services/mediaContent.ts';
import { ShapeType } from '@/services/type/design.ts';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

const SidebarUpload = () => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<{ url: string; id: string }[]>([]);

  const handleUploadImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('image', file);
      await mediaContentApi.uploadImage(formData);
    },
    [],
  );

  useEffect(() => {
    mediaContentApi.getListImage().then((data) => setImages(data as any));
  }, []);

  return (
    <SidebarWrapper label={t`uploads`} showIconClose>
      <AppInputSearch placeholder={t`search`} />
      <AppButton
        onClick={() => inputRef.current?.click()}
        fullWidth
      >{t`uploadFiles`}</AppButton>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        onChange={handleUploadImage}
      />
      <div className={style.containerImageList}>
        {images.map((item) => (
          <div
            key={item.id}
            className={style.containerImageItem}
            onClick={() => {
              const newShape = DesignHelper.createShape(ShapeType.IMAGE, {
                url: item.url,
                width: undefined,
                height: undefined,
              });
              designStore.addShape(newShape);
            }}
          >
            <img className={style.imageItem} src={item.url} alt={'image'} />
          </div>
        ))}
      </div>
    </SidebarWrapper>
  );
};

export default SidebarUpload;
