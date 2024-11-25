import { styled } from '@mui/material/styles';
import { X } from 'lucide-react';
import { forwardRef, PropsWithChildren } from 'react';

import DesignSidebarTypeEvent from '@/events/DesignSidebarTypeEvent.ts';

import style from './style.module.scss';

type Props = PropsWithChildren<{
  label?: string;
  showIconClose?: boolean;
  className?: string;
}>;

const WrapperStyled = styled('div')(() => ({
  padding: '16px',
  height: '100%',
}));

const SidebarWrapper = forwardRef<HTMLDivElement, Props>(
  ({ label, showIconClose, children, className }, ref) => {
    return (
      <WrapperStyled ref={ref} className={className}>
        <div className={style.containerHead}>
          <span className={style.label}>{label}</span>
          {showIconClose && (
            <div
              onClick={() => DesignSidebarTypeEvent.dispatch(undefined)}
              className={style.wrapperIconClose}
            >
              <X />
            </div>
          )}
        </div>
        {children}
      </WrapperStyled>
    );
  },
);

SidebarWrapper.displayName = 'SidebarWrapper';

export default SidebarWrapper;
