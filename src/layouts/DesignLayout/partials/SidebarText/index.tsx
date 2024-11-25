import { Type } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import AppButton from '@/components/Button';
import { AppColors } from '@/constants';
import DesignHelper from '@/helpers/DesignHelper.ts';
import SidebarWrapper from '@/layouts/DesignLayout/partials/SidebarWrapper';
import { ShapeType } from '@/services/type/design.ts';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

const SidebarText = () => {
  const { t } = useTranslation();

  const handleAddTextBox = () => {
    const newShape = DesignHelper.createShape(ShapeType.TEXT, {
      text: 'Your paragraph text',
      fill: AppColors.neutral['900'],
      width: undefined,
      height: undefined,
      name: 'Text ' + designStore.totalShapes,
    });
    const { x, y } = DesignHelper.getPositionCenterShapeWithStage({
      type: newShape.type,
      shapeWidth: newShape.width,
      shapeHeight: newShape.height,
      heightStage: designStore.height,
      widthStage: newShape.width,
    });
    newShape.x = x;
    newShape.y = y;
    designStore.addShape(newShape);
  };

  return (
    <SidebarWrapper label={t`text`} showIconClose>
      <AppButton
        fullWidth
        onClick={handleAddTextBox}
        startIcon={<Type size={20} />}
        className={style.btnAddTextBox}
      >
        {t`addATextBox`}
      </AppButton>
    </SidebarWrapper>
  );
};

export default SidebarText;
