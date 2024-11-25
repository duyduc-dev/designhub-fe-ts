import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import useElementScrollEvent from '@/hooks/useElementScrollEvent.ts';
import HeaderMainLayout from '@/layouts/MainLayout/Header';
import NavbarContent from '@/layouts/MainLayout/NavbarContent';
import EventHelper, { EventKeys } from '@/utils/event.ts';

import Navbar from './Navbar';
import styles from './style.module.scss';

const MainLayout = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useElementScrollEvent(refContainer, () =>
    EventHelper.dispatch(
      EventKeys.PAGE_SCROLLING,
      ref.current?.getBoundingClientRect().y,
    ),
  );

  return (
    <div className={styles.container}>
      <Navbar />
      <NavbarContent />
      <div className={styles.contentLayout}>
        <main ref={refContainer} className={styles.contentInnerLayout}>
          <div ref={ref}></div>
          <HeaderMainLayout />
          <div className={styles.contentOutlet}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
