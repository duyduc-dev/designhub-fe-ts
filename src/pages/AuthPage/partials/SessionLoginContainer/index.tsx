import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';
import { forwardRef, ReactNode } from 'react';

import style from './style.module.scss';

type Props = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  showIconBack?: boolean;
  onClickBack?: () => void;
};

const SessionLoginContainer = forwardRef<HTMLDivElement, Props>(
  (
    {
      title,
      description,
      children,
      className,
      containerClassName,
      showIconBack,
      onClickBack,
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={clsx(style.container, containerClassName)}>
        <div className={style.inner}>
          <div className={style.head}>
            <div className={style.wrapperHeaderTitle}>
              {showIconBack && (
                <button
                  type="button"
                  className={style.btnIconBack}
                  onClick={onClickBack}
                >
                  <ChevronLeft />
                </button>
              )}

              <p className={style.signInOrSignUpNow}>{title}</p>
            </div>
            <span className={style.signInOrSignUpNowDesc}>{description}</span>
          </div>
          <div className={clsx(style.content, className)}>{children}</div>
        </div>
      </div>
    );
  },
);

SessionLoginContainer.displayName = 'SessionLoginContainer';

export default SessionLoginContainer;
