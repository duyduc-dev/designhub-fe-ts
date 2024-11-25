import { useKeyPressHandler } from 'hooks-react-custom';
import { observer } from 'mobx-react';
import { useCallback, useEffect } from 'react';
import { Stage } from 'react-konva';
import { useParams } from 'react-router-dom';

import toaster from '@/components/Toast/toaster.tsx';
import DesignRemoveShapeEvent from '@/events/DesignRemoveShapeEvent.ts';
import DesignSidebarTypeEvent from '@/events/DesignSidebarTypeEvent.ts';
import { HttpResponse } from '@/http/type.ts';
import AppLayer from '@/pages/DesignPage/components/AppLayer';
import ToolShapeElement from '@/pages/DesignPage/components/ToolShapeElement';
import { ShapeType } from '@/services/type/design.ts';
import designStore from '@/stores/design/DesignStore.ts';

import style from './style.module.scss';

const DesignPage = () => {
  const { id } = useParams<{ id: string }>();

  const fetchDesign = useCallback(async (id: string) => {
    try {
      await designStore.fetchDetailDesign(id);
    } catch (e) {
      toaster.catchError(e as HttpResponse);
    }
  }, []);

  useEffect(() => {
    if (id) fetchDesign(id);
  }, [id]);

  useKeyPressHandler('delete', () => {
    if (designStore.shapeSelected) {
      if (
        designStore.shapeSelected.type === ShapeType.TEXT &&
        DesignSidebarTypeEvent.latestData
      )
        return;
      const dataRemoved = designStore.removeShapeSelected();
      if (dataRemoved) DesignRemoveShapeEvent.dispatch(dataRemoved.id);
    }
  });

  return (
    <div className={style.container}>
      <ToolShapeElement />
      <Stage
        className={style.containerStage}
        width={designStore.width || 500}
        height={designStore.height || 500}
      >
        {designStore.design.map((layer, index) => (
          <AppLayer key={layer?.id || index} layer={layer} />
        ))}
      </Stage>
    </div>
  );
};

export default observer(DesignPage);
