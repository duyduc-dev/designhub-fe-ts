import { Outlet } from 'react-router-dom';

import HeaderDesignLayout from '@/layouts/DesignLayout/partials/Header/index.tsx';
import ToolSidebarDesign from '@/layouts/DesignLayout/partials/ToolSidebarDesign/index.tsx';

import style from './styles/style.module.scss';

const DesignLayout = () => {
  return (
    <div className={style.container}>
      <HeaderDesignLayout />
      <div className={style.content}>
        <ToolSidebarDesign />
        <div className={style.designContent}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DesignLayout;
