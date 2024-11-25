import { PropsWithChildren } from 'react';

import DesignHelper from '@/helpers/DesignHelper.ts';
import { TemplateShape } from '@/layouts/DesignLayout/partials/SidebarElement/Shapes/templateShape.tsx';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

type Props = PropsWithChildren<{
  shape: TemplateShape;
}>;

const WrapperElement = ({ children, shape }: Props) => {
  const handleClick = () => {
    const newShape = DesignHelper.createShape(shape.type);
    const { x, y } = DesignHelper.getPositionCenterShapeWithStage({
      type: newShape.type,
      shapeWidth: newShape.width,
      shapeHeight: newShape.height,
      heightStage: designStore.height,
      widthStage: designStore.width,
    });
    newShape.x = x;
    newShape.y = y;
    newShape.name = 'Shape ' + designStore.totalShapes;
    designStore.addShape(newShape);
  };

  return (
    <div onClick={handleClick} tabIndex={-1} className={style.container}>
      {children}
    </div>
  );
};

export default WrapperElement;
