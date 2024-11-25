import clsx from 'clsx';
import { CloudUpload, Layers3, Shapes, Type } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DesignSidebarTypeEvent from '@/events/DesignSidebarTypeEvent.ts';
import useEventHandler from '@/events/hooks/useEventHandler.ts';
import SidebarColors from '@/layouts/DesignLayout/partials/SidebarColors';
import SidebarElement from '@/layouts/DesignLayout/partials/SidebarElement/index.tsx';
import SidebarLayer from '@/layouts/DesignLayout/partials/SidebarLayer';
import SidebarText from '@/layouts/DesignLayout/partials/SidebarText';
import SidebarTextEditableShape from '@/layouts/DesignLayout/partials/SidebarTextEditableShape';
import SidebarUpload from '@/layouts/DesignLayout/partials/SidebarUpload';

import style from './style.module.scss';

export enum SidebarType {
  ELEMENT = 'ELEMENT',
  TEXT = 'TEXT',
  TEXT_EDITABLE = 'TEXT_EDITABLE',
  UPLOADS = 'UPLOADS',
  LAYER = 'LAYER',
  COLOR = 'COLOR',
}

const ToolSidebarDesign = () => {
  const { t } = useTranslation();

  const [currentSidebar, setCurrentSidebar] = useState<SidebarType>();

  const ElementSidebar = useMemo(
    () => ({
      [SidebarType.ELEMENT]: <SidebarElement />,
      [SidebarType.TEXT]: <SidebarText />,
      [SidebarType.UPLOADS]: <SidebarUpload />,
      [SidebarType.TEXT_EDITABLE]: <SidebarTextEditableShape />,
      [SidebarType.LAYER]: <SidebarLayer />,
      [SidebarType.COLOR]: <SidebarColors />,
    }),
    [],
  );

  const tools = [
    {
      key: SidebarType.ELEMENT,
      title: 'elements',
      icon: <Shapes strokeWidth={1.5} size={24} />,
    },
    {
      key: SidebarType.TEXT,
      title: 'text',
      icon: <Type strokeWidth={1.5} size={24} />,
    },
    {
      key: SidebarType.UPLOADS,
      title: 'uploads',
      icon: <CloudUpload strokeWidth={1.5} size={24} />,
    },
    {
      key: SidebarType.LAYER,
      title: 'layer',
      icon: <Layers3 strokeWidth={1.5} size={24} />,
    },
  ];

  const handleClickTab = (type: SidebarType) => {
    setCurrentSidebar(type === currentSidebar ? undefined : type);
  };

  useEventHandler(DesignSidebarTypeEvent, (data) => {
    setCurrentSidebar(data);
  });

  return (
    <aside className={style.container}>
      <div className={style.listTools}>
        {tools.map((item) => (
          <button
            tabIndex={-1}
            key={item.key}
            onClick={() => handleClickTab(item.key)}
            className={clsx(
              style.containerItem,
              item.key === currentSidebar && style.tabActive,
            )}
          >
            <div className={style.iconContainer}>{item.icon}</div>
            <span className={style.titleItem}>{t(item.title)}</span>
          </button>
        ))}
      </div>
      <div
        className={clsx(
          style.contentSidebarWrapper,
          currentSidebar && style.visible,
        )}
      >
        <div className={style.innerSidebarContent}>
          {currentSidebar && ElementSidebar[currentSidebar]}
        </div>
      </div>
    </aside>
  );
};

export default ToolSidebarDesign;
