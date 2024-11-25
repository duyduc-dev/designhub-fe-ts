import clsx from 'clsx';
import { Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import AppInputSearch from '@/components/Input/AppInputSearch.tsx';
import AppTooltip from '@/components/Tooltip';
import { AppColors } from '@/constants';
import CustomColorPicker from '@/layouts/DesignLayout/partials/SidebarColors/CustomColorPicker.tsx';
import SidebarWrapper from '@/layouts/DesignLayout/partials/SidebarWrapper';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

const SidebarColors = () => {
  const { t } = useTranslation();

  return (
    <SidebarWrapper label={t`colors`} showIconClose>
      <AppInputSearch fullWidth placeholder={t`searchColors`} />
      <div className={style.wrapCustomColor}>
        <CustomColorPicker />
      </div>
      <div className={style.wrapperColors}>
        <div className={style.titleColor}>
          <Palette size={20} />
          {t`defaultColor`}
        </div>
        <div className={style.containerColorList}>
          {AppColors.toArray().map((item, index) => (
            <div
              key={item + 'index' + index}
              className={clsx(style.wrapperItemColor)}
              data-tooltip-content={item}
              data-tooltip-id="tooltip-color-item"
              onClick={() => {
                if (designStore.shapeSelected)
                  designStore.shapeSelected.fill = item;
              }}
            >
              <div
                className={clsx(style.itemColor)}
                style={{ backgroundColor: item }}
              ></div>
            </div>
          ))}
          <AppTooltip place="bottom" id="tooltip-color-item" />
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default SidebarColors;
