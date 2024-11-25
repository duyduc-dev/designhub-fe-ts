import { Circle, Rect, Text } from 'react-konva';

import ImageShape from '@/components/Shapes/ImageShape';
import { ShapeType } from '@/services/type/design.ts';

export const ShapeMapping = {
  [ShapeType.RECTANGLE]: Rect,
  [ShapeType.CIRCLE]: Circle,
  [ShapeType.ROUNDED_RECTANGLE]: Rect,
  [ShapeType.TEXT]: Text,
  [ShapeType.IMAGE]: ImageShape,
};
