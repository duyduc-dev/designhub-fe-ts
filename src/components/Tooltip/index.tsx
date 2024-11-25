import clsx from 'clsx';
import { ITooltip, Tooltip as ReactTooltip } from 'react-tooltip';

import style from './style.module.scss';

type Props = ITooltip;

const AppTooltip = ({
  anchorSelect,
  content,
  className,
  opacity = 1,
  ...props
}: Props) => {
  return (
    <ReactTooltip
      anchorSelect={anchorSelect}
      content={content}
      delayShow={500}
      opacity={opacity}
      className={clsx(style.tooltip, className)}
      {...props}
    />
  );
};

export default AppTooltip;
