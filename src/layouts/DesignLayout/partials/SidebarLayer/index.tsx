import clsx from 'clsx';
import { GripVertical } from 'lucide-react';
import { observer } from 'mobx-react';
import { Component, useRef } from 'react';
import DraggableList from 'react-draggable-list';
import { useTranslation } from 'react-i18next';

import SidebarWrapper from '@/layouts/DesignLayout/partials/SidebarWrapper';
import { TShape } from '@/services/type/design.ts';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

type ItemProps = {
  item: TShape;
  itemSelected: number;
  dragHandleProps: object;
};

class Item extends Component<ItemProps> {
  setRef(node: HTMLDivElement) {
    return node;
  }

  render() {
    const { item, dragHandleProps } = this.props;
    return (
      <div
        ref={this.setRef}
        className={clsx(
          style.item,
          designStore.shapeSelected?.id === item.id && style.selected,
        )}
      >
        <div className="drag-here" {...dragHandleProps}>
          <GripVertical />
        </div>
        {item.name} {item.rootLayer && '(root)'}
      </div>
    );
  }
}

const ItemObserver = observer(Item);

const SidebarLayer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <SidebarWrapper
      label={t`layers`}
      ref={ref}
      showIconClose
      className={style.container}
    >
      <div className={style.containerList}>
        <DraggableList<TShape, void, Item>
          itemKey="id"
          list={designStore.shapesCurrentLayer}
          container={() => ref.current}
          onMoveEnd={(_, __, oldIndex, newIndex) =>
            designStore.moveShape(oldIndex, newIndex)
          }
          template={ItemObserver}
        />
      </div>
    </SidebarWrapper>
  );
};

export default observer(SidebarLayer);
