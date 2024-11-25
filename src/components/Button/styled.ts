import { Button, styled } from '@mui/material';

import { AppColors } from '@/constants/index.ts';
import { hexToRgba } from '@/utils/helpers.ts';
import { AppButtonProps, ButtonVariant } from '@/components/Button/index.tsx';

const ButtonColorLoadingVariant: {
  contained: string;
  outlined: string;
  text: string;
} = {
  contained: AppColors.neutral['0'],
  outlined: AppColors.neutral['900'],
  text: '',
};

type ButtonStyledProps = Omit<AppButtonProps, 'loading'> & {
  loading: 'true' | 'false';
};

export const ButtonStyled = styled(Button)<ButtonStyledProps>(
  ({ fullWidth, loading = 'false', variant = ButtonVariant.CONTAINED }) => ({
    textTransform: 'none',
    boxShadow: 'none',
    fontSize: '1.3rem',
    cursor: 'pointer',
    height: 42,

    width: fullWidth ? '100%' : undefined,
    borderRadius: 8,

    ...(loading === 'true' && {
      opacity: 0.9,
      color:
        (ButtonColorLoadingVariant?.[variant] || AppColors.neutral['0']) +
        ' !important',
    }),

    '&.DesignHubButton-text.DesignHubButton-colorPrimary': {
      color: AppColors.neutral['900'],
      ':hover': {
        backgroundColor: hexToRgba(AppColors.neutral['900'], 0.05),
      },
    },

    '&.DesignHubButton-contained.DesignHubButton-colorPrimary': {
      backgroundColor: AppColors.neutral['900'],
    },

    '&.DesignHubButton-outlined.DesignHubButton-colorPrimary': {
      borderColor: AppColors.neutral['900'],
      color: AppColors.neutral['900'],
    },

    '&.Mui-disabled': {
      opacity: 0.5,
      color: ButtonColorLoadingVariant[variant],
    },
  }),
);

export const WrapperLoadingIndicator = styled('div')`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
