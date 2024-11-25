import Konva from 'konva';
import { observer } from 'mobx-react';
import { ElementRef, useCallback, useRef } from 'react';
import { Layer, Transformer } from 'react-konva';

import DesignRemoveShapeEvent from '@/events/DesignRemoveShapeEvent.ts';
import DesignSidebarTypeEvent from '@/events/DesignSidebarTypeEvent.ts';
import useEventHandler from '@/events/hooks/useEventHandler.ts';
import AppShape from '@/pages/DesignPage/components/AppShape';
import { TLayer, TShape } from '@/services/type/design.ts';
import designStore from '@/stores/design/DesignStore.ts';

type Props = {
  layer: TLayer;
};

const AppLayer = ({ layer }: Props) => {
  const transformRef = useRef<ElementRef<typeof Transformer>>(null);
  const layerRef = useRef<ElementRef<typeof Layer>>(null);

  const handleClickShape = useCallback(
    (shape: TShape, e: Konva.KonvaEventObject<MouseEvent>) => {
      if (shape.rootLayer) {
        designStore.shapeSelectedId = undefined;
        transformRef.current?.nodes([]);
        DesignSidebarTypeEvent.dispatch(undefined);
        return;
      }
      designStore.shapeSelectedId = shape.id;
      transformRef.current?.nodes([e.currentTarget]);
    },
    [],
  );

  useEventHandler(DesignRemoveShapeEvent, () => {
    designStore.shapeSelectedId = undefined;
    transformRef.current?.nodes([]);
    DesignSidebarTypeEvent.dispatch(undefined);
  });

  return (
    <Layer ref={layerRef} id={layer.id} key={layer.id}>
      {layer.shapes?.map((shape) => (
        <AppShape
          shape={shape}
          key={shape.id}
          onClick={(e) => handleClickShape(shape, e)}
        />
      ))}
      <Transformer ref={transformRef} />
    </Layer>
  );
};
export default observer(AppLayer);
