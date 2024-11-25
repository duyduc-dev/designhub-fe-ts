import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import style from './navbar.module.scss';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  title: string;
  link: string;
};

const NavItem = ({ icon, title, link }: Props) => {
  const { t } = useTranslation();

  return (
    <NavLink
      to={link}
      tabIndex={-1}
      className={({ isActive }) =>
        clsx(style.navItemContainer, isActive && style.active)
      }
    >
      <div className={style.navItemIcon}>{icon}</div>
      <p className={style.navItemTitle}>{t(title)}</p>
    </NavLink>
  );
};

export default NavItem;
