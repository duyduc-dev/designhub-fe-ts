import { InputAdornment } from '@mui/material';
import { Pipette } from 'lucide-react';
import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useRef,
} from 'react';
import { HexAlphaColorPicker } from 'react-colorful';
import useEyeDropper from 'use-eye-dropper';

import AppInput from '@/components/Input';
import Popover, { AppPopoverRef } from '@/components/Popover';
import { mergeRefs } from '@/utils/helpers.ts';

import style from './style.module.scss';

type Props = PropsWithChildren<Partial<ColorPickerBaseProps>>;

export type AppColorPickerRef = AppPopoverRef;

type ColorPickerHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange' | 'onChangeCapture'
>;

export interface ColorPickerBaseProps extends ColorPickerHTMLAttributes {
  color: string;
  onChange: (newColor: string) => void;
}

const AppColorPicker = forwardRef<AppColorPickerRef, Props>(
  ({ children, color, onChange, ...props }, ref) => {
    const innerRef = useRef<AppColorPickerRef>(null);

    const { open, isSupported } = useEyeDropper();

    const handlePickEyeColor = useCallback(async () => {
      try {
        const color = await open();
        onChange?.(color.sRGBHex);
      } catch (e) {
        console.log('handlePickEyeColor>>', e);
      }
    }, [onChange, open]);

    return (
      <Popover
        ref={mergeRefs(ref, innerRef)}
        onClickOutside={() => innerRef.current?.close()}
        placement="bottom-end"
        render={() => (
          <div className={style.containerPopup}>
            <HexAlphaColorPicker
              className={style.colorPicker}
              {...props}
              color={color}
              onChange={onChange}
            />
            <div className={style.wrapInputColor}>
              <AppInput
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <div
                          style={{
                            backgroundColor: color,
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                          }}
                        ></div>
                      </InputAdornment>
                    ),
                  },
                }}
                fullWidth
                value={color?.toUpperCase()}
                onChange={(e) => onChange?.(e.target.value)}
              />
              {isSupported() && (
                <div
                  className={style.btnEyeDropper}
                  onClick={handlePickEyeColor}
                >
                  <Pipette size={20} />
                </div>
              )}
            </div>
          </div>
        )}
      >
        {children}
      </Popover>
    );
  },
);

AppColorPicker.displayName = 'AppColorPicker';

export default AppColorPicker;
