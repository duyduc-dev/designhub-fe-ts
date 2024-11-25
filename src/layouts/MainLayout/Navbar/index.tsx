import { FolderMinus, House } from 'lucide-react';

import { AppRoutes } from '@/constants/index.ts';
import NavItem from '@/layouts/MainLayout/Navbar/NavItem.tsx';

import style from './navbar.module.scss';

const Navbar = () => {
  const navData = [
    {
      key: 'Home',
      title: 'home',
      link: AppRoutes.ROOT,
      icon: <House strokeWidth={1.5} size={24} />,
    },
    {
      key: 'FolderMinus',
      title: 'projects',
      link: AppRoutes.PROJECTS,
      icon: <FolderMinus strokeWidth={1.5} size={24} />,
    },
  ];

  return (
    <nav className={style.container}>
      {navData.map((item) => (
        <NavItem {...item} key={item.key} />
      ))}
    </nav>
  );
};

export default Navbar;
