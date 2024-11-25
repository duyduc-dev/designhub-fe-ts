import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import AppInput from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

const CornerProgress = () => {
  const { t } = useTranslation();
  return (
    <div className={style.wrapper}>
      <p>{t`cornerRounding`}</p>
      <div className={style.containerProgress}>
        <ProgressBar
          defaultValue={
            (designStore.shapeSelected?.cornerRadius as number) || 0
          }
          onChange={(value: number) => {
            if (designStore.shapeSelected)
              designStore.shapeSelected.cornerRadius = value * 2;
          }}
        />
        <AppInput
          className={style.inputPercent}
          value={((designStore.shapeSelected?.cornerRadius as number) || 0) / 2}
        />
      </div>
    </div>
  );
};

export default observer(CornerProgress);
