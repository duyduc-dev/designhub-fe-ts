import clsx from 'clsx';
import { Check } from 'lucide-react';

import style from './style.module.scss';

type ItemProps<T> = {
  data: T;
  label?: string;
  value?: string;
  selected?: boolean;
  onClick?: (data: T) => void;
  showIconSelected?: boolean;
};

type ContentPopoverProps<T> = {
  valueSelected?: string;
  options: T[];
  onSelect?: (data: T) => void;
  valueField: keyof T;
  labelField: keyof T;
  showIconSelected?: boolean;
};

const Item = <T,>({
  data,
  label,
  value,
  selected,
  onClick,
  showIconSelected,
}: ItemProps<T>) => {
  return (
    <button
      className={clsx(style.optionItem, selected && style.selected)}
      type="button"
      onClick={() => onClick?.(data)}
    >
      <p>{label || value}</p>
      {selected && showIconSelected && <Check strokeWidth={1.5} size={20} />}
    </button>
  );
};

const ContentPopover = <T,>({
  valueSelected,
  options = [],
  onSelect,
  valueField,
  labelField,
  ...props
}: ContentPopoverProps<T>) => {
  return (
    <div className={style.listWrapper}>
      {options.map((item, index) => (
        <Item
          // @ts-ignore
          key={item?.id ?? index}
          selected={valueSelected === item[valueField]}
          onClick={onSelect}
          label={item[labelField] as any}
          value={item[valueField] as any}
          data={item}
          {...props}
        />
      ))}
    </div>
  );
};

export default ContentPopover;
