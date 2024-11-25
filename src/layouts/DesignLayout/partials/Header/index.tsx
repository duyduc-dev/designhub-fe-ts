import { MoveLeft } from 'lucide-react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import TextEditable from '@/components/TextEditable';
import toaster from '@/components/Toast/toaster.tsx';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

const HeaderDesignLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  return (
    <header className={style.container}>
      <div className={style.innerHeader}>
        <button
          tabIndex={-1}
          type={'button'}
          onClick={handleback}
          className={style.backButton}
        >
          <MoveLeft />
        </button>
        <div className={style.middleHeader}>
          <TextEditable
            value={designStore.title || t`untitledDesign`}
            onChange={(value) => {
              designStore.title = value;
              toaster({
                title: 'change name successfully',
                message: `>> ${value}`,
              });
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default observer(HeaderDesignLayout);
