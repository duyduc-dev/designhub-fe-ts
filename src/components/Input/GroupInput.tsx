import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';

import styles from './style.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

const GroupInput = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    return (
      <div className={clsx(styles.containerGroupInput, className)} ref={ref}>
        {children}
      </div>
    );
  },
);

GroupInput.displayName = 'GroupInput';

export default GroupInput;
