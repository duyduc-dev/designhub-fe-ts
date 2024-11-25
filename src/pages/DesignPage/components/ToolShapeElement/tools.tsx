import { Pencil } from 'lucide-react';
import { ReactNode } from 'react';

import DesignSidebarTypeEvent from '@/events/DesignSidebarTypeEvent.ts';
import { SidebarType } from '@/layouts/DesignLayout/partials/ToolSidebarDesign';
import ToolCornerShape from '@/pages/DesignPage/components/ToolCornerShape';
import { ShapeType } from '@/services/type/design.ts';

type ToolShapeElement = {
  key: string;
  disableType?: ShapeType[];
  enableType?: ShapeType[];
  element: ReactNode;
  onClick?: () => void;
};

export const toolShapeElement: ToolShapeElement[] = [
  {
    key: 'ToolCornerShape',
    element: <ToolCornerShape />,
    disableType: [ShapeType.CIRCLE, ShapeType.TEXT],
  },
  {
    key: 'Pencil',
    element: <Pencil size={20} />,
    enableType: [ShapeType.TEXT],
    onClick: () => DesignSidebarTypeEvent.dispatch(SidebarType.TEXT_EDITABLE),
  },
];
