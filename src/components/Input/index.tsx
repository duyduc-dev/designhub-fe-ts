import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

import { AppColors } from '@/constants/index.ts';

export type AppInputProps = TextFieldProps & {
  readOnly?: boolean;
};
export type AppInputRef = HTMLDivElement;

const InputStyled = styled(TextField)<AppInputProps>(({ readOnly }) => ({
  border: `none`,
  fontSize: 'inherit !important',

  '& > *': {
    transition: '.1s linear all',
  },

  '& .DesignHubFormLabel-root.Mui-focused': {
    color: AppColors.neutral['900'],
  },

  '& .DesignHubInputBase-input': {
    fontSize: '1.4rem',
  },

  '& .DesignHubOutlinedInput-root': {
    height: 40,
    borderRadius: 8,

    '&.Mui-focused': {
      '.DesignHubOutlinedInput-notchedOutline': {
        borderColor: AppColors.neutral['800'],
        borderWidth: 1,
      },
    },

    '&.Mui-error': {
      '.DesignHubOutlinedInput-notchedOutline': {
        borderColor: AppColors.error['500'],
      },
    },
  },

  '& .DesignHubFormHelperText-root': {
    fontSize: 12,
  },

  ...(readOnly && {
    '.DesignHubOutlinedInput-input': {
      '&.Mui-disabled': {
        color: AppColors.neutral['900'] + ' !important',
        WebkitTextFillColor: AppColors.neutral['900'] + ' !important',
      },
    },
  }),

  '&::before, &::after': {
    display: 'none',
  },
}));

const AppInput = forwardRef<AppInputRef, AppInputProps>(
  (
    {
      children,
      value,
      onChange,
      readOnly,
      disabled,
      autoComplete = 'off',
      ...props
    },
    ref,
  ) => {
    return (
      <InputStyled
        ref={ref}
        autoComplete={autoComplete}
        disabled={
          disabled !== undefined
            ? disabled
            : readOnly !== undefined
              ? readOnly
              : undefined
        }
        size="small"
        margin="dense"
        value={value}
        onChange={onChange}
        readOnly={readOnly && !disabled}
        {...props}
      >
        {children}
      </InputStyled>
    );
  },
);

AppInput.displayName = 'AppInput';

export default AppInput;
