import clsx from 'clsx';
import { useEffect, useState } from 'react';

import HeaderProfileButton from '@/components/HeaderProfileButton/index.tsx';
import EventHelper, { EventKeys } from '@/utils/event.ts';

import style from './header.module.scss';

const HeaderMainLayout = () => {
  const BREAKPOINT_SCROLL = 8;

  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    return EventHelper.subscriber(
      EventKeys.PAGE_SCROLLING,
      ({ detail }: any) => {
        if (detail < -BREAKPOINT_SCROLL) {
          setShowShadow(true);
        } else if (detail === BREAKPOINT_SCROLL) {
          setShowShadow(false);
        }
      },
    );
  }, []);

  return (
    <header className={clsx(style.container, showShadow && style.boxShadow)}>
      <div className={style.headerInner}>
        {/*<HeaderSearch />*/}
        <div></div>
        <HeaderProfileButton />
      </div>
    </header>
  );
};

export default HeaderMainLayout;
