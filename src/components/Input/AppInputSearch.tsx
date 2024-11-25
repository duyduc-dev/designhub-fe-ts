import { InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';
import { forwardRef } from 'react';

import AppInput, {
  AppInputProps,
  AppInputRef,
} from '@/components/Input/index.tsx';

const AppInputSearch = forwardRef<AppInputRef, AppInputProps>((props, ref) => (
  <AppInput
    fullWidth
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <Search size={20} />
          </InputAdornment>
        ),
      },
    }}
    {...props}
    ref={ref}
  />
));

AppInputSearch.displayName = 'AppInputSearch';

export default AppInputSearch;
