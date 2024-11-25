import CircularProgress from '@mui/material/CircularProgress';
import { ButtonProps } from '@mui/material/Button';
import { ButtonStyled, WrapperLoadingIndicator } from './styled';
import { ReactNode } from 'react';

export enum ButtonVariant {
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
  TEXT = 'text',
}

export type AppButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  loading?: boolean;
  loadingIndicator?: ReactNode;
  disabled?: boolean;
} & Omit<ButtonProps, 'variant'>;

const AppButton = ({
  children,
  variant = ButtonVariant.CONTAINED,
  fullWidth = false,
  className,
  type = 'button',
  loading = false,
  loadingIndicator = (
    <CircularProgress size={20} color={'#ffffff' as 'primary'} />
  ),
  disabled,
  ...props
}: AppButtonProps) => {
  return (
    <ButtonStyled
      {...props}
      loading={String(loading) as any}
      type={type}
      disabled={disabled || loading}
      variant={variant as any}
      fullWidth={fullWidth}
      disableElevation={true}
      className={className}
    >
      {loading && (
        <WrapperLoadingIndicator>{loadingIndicator}</WrapperLoadingIndicator>
      )}
      {!loading && children}
    </ButtonStyled>
  );
};

export default AppButton;
