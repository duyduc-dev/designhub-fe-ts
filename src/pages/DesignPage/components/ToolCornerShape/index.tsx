import { LoaderCircle } from 'lucide-react';
import { observer } from 'mobx-react';
import { useRef } from 'react';

import Popover, { AppPopoverRef } from '@/components/Popover';
import CornerProgress from '@/pages/DesignPage/components/ToolCornerShape/CornerProgress.tsx';
import style from '@/pages/DesignPage/components/ToolShapeElement/style.module.scss';

const ToolCornerShape = () => {
  const popoverRef = useRef<AppPopoverRef>(null);

  return (
    <Popover
      ref={popoverRef}
      onClickOutside={() => popoverRef.current?.close()}
      render={<CornerProgress />}
    >
      <div className={style.conor} onClick={() => popoverRef.current?.toggle()}>
        <LoaderCircle size={22} />
      </div>
    </Popover>
  );
};

export default observer(ToolCornerShape);
