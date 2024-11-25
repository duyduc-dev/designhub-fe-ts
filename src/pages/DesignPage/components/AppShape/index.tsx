import { observer } from 'mobx-react';
import { memo, useMemo } from 'react';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

import { ShapeMapping } from '@/constants/shape.ts';
import { TShape } from '@/services/type/design.ts';

type Props = {
  shape: TShape;
  onClick?: KonvaNodeEvents['onClick'];
};

const AppShape = ({ shape, onClick }: Props) => {
  const Shape = useMemo(() => ShapeMapping[shape.type], [shape.type]);

  return <Shape onClick={onClick} {...shape} key={shape?.id} id={shape?.id} />;
};

export default memo(observer(AppShape));
