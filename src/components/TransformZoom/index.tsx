import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { normalizeArgs } from '@/utils/helpers.ts';

import style from './style.module.scss';

const TransformZoom = ({ children, ...props }: any) => {
  return (
    <TransformWrapper
      {...normalizeArgs(props)}
      // initialScale={0.4}
      minScale={0.1}
      maxScale={1.5}
      centerOnInit
    >
      <TransformComponent
        contentClass={'contentClass'}
        wrapperClass={style.wrapperTransform}
      >
        {children}
      </TransformComponent>
    </TransformWrapper>
  );
};

export default TransformZoom;
