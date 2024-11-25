import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

import styles from './style.module.scss';

type Props<T extends object> = {
  data?: T;
  onClick?: () => void;
  active?: boolean;
  placeholder?: string;
  labelField: keyof T;
  valueField: keyof T;
  fullWidth?: boolean;
};

const ButtonDropdown = <T extends object>({
  data,
  onClick,
  active,
  placeholder,
  labelField,
  valueField,
  fullWidth,
}: Props<T>) => {
  return (
    <button
      className={clsx(
        styles.buttonDropdown,
        fullWidth && styles.fullWidth,
        active && styles.active,
      )}
      onClick={onClick}
    >
      <p
        className={clsx(
          styles.titleButton,

          !data && placeholder && styles.placeholder,
        )}
      >
        {/* @ts-ignore */}
        {data?.[labelField] || data?.[valueField] || placeholder}
      </p>
      <ChevronDown strokeWidth={1.5} size={20} />
    </button>
  );
};

export default ButtonDropdown;
