import { PaintRoller } from 'lucide-react';
import { observer } from 'mobx-react';
import { useRef } from 'react';

import AppColorPicker, { AppColorPickerRef } from '@/components/ColorPicker';
import AppTooltip from '@/components/Tooltip';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

const CustomColorPicker = () => {
  const ref = useRef<AppColorPickerRef>(null);

  const handleChange = (newColor: string) => {
    if (designStore.shapeSelected) {
      designStore.shapeSelected.fill = newColor;
    }
  };

  return (
    <AppColorPicker
      color={designStore.shapeSelected?.fill}
      onChange={handleChange}
      ref={ref}
    >
      <div
        onClick={() => ref.current?.open()}
        className={style.wrapPantCustomColor}
        data-tooltip-id="pain-custom-color-picker"
        data-tooltip-content="Custom color"
      >
        <PaintRoller size={20} />
      </div>
      <AppTooltip id="pain-custom-color-picker" />
    </AppColorPicker>
  );
};

export default observer(CustomColorPicker);
