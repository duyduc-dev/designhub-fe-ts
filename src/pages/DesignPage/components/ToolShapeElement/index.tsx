import { observer } from 'mobx-react';

import TextEditable from '@/components/TextEditable';
import DesignSidebarTypeEvent from '@/events/DesignSidebarTypeEvent.ts';
import { SidebarType } from '@/layouts/DesignLayout/partials/ToolSidebarDesign';
import { toolShapeElement } from '@/pages/DesignPage/components/ToolShapeElement/tools.tsx';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

const ToolShapeElement = () => {
  if (!designStore.shapeSelected) return;
  return (
    <div className={style.container}>
      <TextEditable
        value={designStore.shapeSelected?.name ?? ''}
        onChange={(value) => {
          if (designStore.shapeSelected) designStore.shapeSelected.name = value;
        }}
      />
      <div className={style.separator}></div>
      <div
        onClick={() => DesignSidebarTypeEvent.dispatch(SidebarType.COLOR)}
        className={style.colorRounded}
        style={{ backgroundColor: designStore.shapeSelected.fill }}
      ></div>
      <div className={style.wrapTool}>
        {toolShapeElement.map((tool) => {
          const { key, disableType, enableType, element, onClick } = tool;
          const isDisabled =
            (designStore.shapeSelected &&
              disableType?.includes(designStore.shapeSelected.type)) ??
            false;
          const isEnabled =
            !enableType ||
            (designStore.shapeSelected &&
              enableType.includes(designStore.shapeSelected.type));
          if (isDisabled || !isEnabled) {
            return null;
          }
          return (
            <div key={key} className={style.tool} onClick={onClick}>
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(ToolShapeElement);
