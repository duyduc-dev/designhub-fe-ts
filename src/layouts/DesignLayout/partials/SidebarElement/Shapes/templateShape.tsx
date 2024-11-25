import { ReactNode } from 'react';

import Rounded from '@/layouts/DesignLayout/partials/SidebarElement/Shapes/Rounded.tsx';
import RoundedSquare from '@/layouts/DesignLayout/partials/SidebarElement/Shapes/RoundedSquare.tsx';
import Square from '@/layouts/DesignLayout/partials/SidebarElement/Shapes/Square.tsx';
import { ShapeType, TShape } from '@/services/type/design.ts';

export type TemplateShape = {
  element: ReactNode;
  type: ShapeType;
  attribute: Partial<TShape>;
};

export const templateShape: TemplateShape[] = [
  {
    element: <Square />,
    type: ShapeType.RECTANGLE,
    attribute: {
      width: 200,
      height: 200,
    },
  },
  {
    element: <RoundedSquare />,
    type: ShapeType.ROUNDED_RECTANGLE,
    attribute: {
      width: 200,
      height: 200,
    },
  },
  {
    element: <Rounded />,
    type: ShapeType.CIRCLE,
    attribute: {
      width: 200,
      height: 200,
    },
  },
];
