import * as uuid from 'uuid';

import { AppColors } from '@/constants/index.ts';
import { ShapeType, TShape } from '@/services/type/design.ts';

type GetPositionCenterParams = {
  type?: ShapeType;
  widthStage: number;
  heightStage: number;
  shapeWidth: number;
  shapeHeight: number;
};

class DesignHelper {
  getPositionCenterShapeWithStage({
    type,
    widthStage = 0,
    shapeHeight = 0,
    shapeWidth = 0,
    heightStage = 0,
  }: GetPositionCenterParams) {
    const x = widthStage / 2 - shapeWidth / 2;
    const y = heightStage / 2 - shapeHeight / 2;
    if (type === ShapeType.CIRCLE)
      return {
        x: widthStage / 2,
        y: heightStage / 2,
      };
    return { x, y };
  }

  createShape(
    type = ShapeType.RECTANGLE,
    options: Partial<TShape> = {},
  ): TShape {
    const defaultOptions: Partial<TShape> = {
      cornerRadius: type === ShapeType.ROUNDED_RECTANGLE ? 12 : 0,
      ...options,
    };

    return {
      name: 'Shape',
      id: uuid.v4(),
      draggable: true,
      width: 200,
      height: 200,
      fill: AppColors.neutral['200'],
      x: 0,
      y: 0,
      ...defaultOptions,
      type,
    };
  }
}

export default new DesignHelper();
