import { useRef, useState } from 'react';

import ButtonDropdown from '@/components/Dropdown/ButtonDropdown.tsx';
import ContentPopover from '@/components/Dropdown/ContentPopover.tsx';
import AppPopover, { AppPopoverRef } from '@/components/Popover';

import style from './style.module.scss';

type AppDropdownProps<T extends object, V extends keyof T = keyof T> = {
  closeOnClickItem?: boolean;
  fullWidth?: boolean;
  labelField: keyof T;
  onClickButton?: () => void;
  onSelect?: (value: T) => void;
  onSelectValue?: (data?: T[V]) => void;
  options: T[];
  placeholder?: string;
  showIconSelected?: boolean;
  value?: string;
  valueField: V;
};

const AppDropdown = <T extends object>({
  options = [],
  value,
  placeholder,
  labelField,
  valueField,
  fullWidth = false,
  closeOnClickItem = true,
  showIconSelected = false,
  onClickButton,
  onSelect,
  onSelectValue,
}: AppDropdownProps<T>) => {
  const popoverRef = useRef<AppPopoverRef>(null);

  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(() =>
    options.find((item) => item?.[valueField] === value),
  );

  const openPopup = () => popoverRef.current?.open();
  const closePopup = () => popoverRef.current?.close();

  const handleSelect = (data: T) => {
    onSelect?.(data);
    onSelectValue?.(data?.[valueField]);
    setSelected(data);
    if (closeOnClickItem) {
      closePopup();
    }
  };

  const handleClickButton = () => {
    openPopup();
    onClickButton?.();
  };

  return (
    <AppPopover
      onClickOutside={closePopup}
      render={
        <ContentPopover
          labelField={labelField}
          valueField={valueField}
          options={options}
          valueSelected={value}
          onSelect={handleSelect}
          showIconSelected={showIconSelected}
        />
      }
      onShow={() => setActive(true)}
      onHide={() => setActive(false)}
      ref={popoverRef}
      renderClassName={style.fullWidth}
    >
      <ButtonDropdown<T>
        fullWidth={fullWidth}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        active={active}
        data={selected}
        onClick={handleClickButton}
      />
    </AppPopover>
  );
};

export default AppDropdown;
