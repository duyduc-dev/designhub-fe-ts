import { InputLabel, styled } from '@mui/material';

import { AppColors } from '@/constants/index.ts';

const AppInputLabel = styled(InputLabel)(() => ({
  '&.DesignHubFormLabel-root': {
    fontSize: '1.2rem',
    fontWeight: 500,
    color: AppColors.neutral['500'],
  },
}));

export default AppInputLabel;
