import { observer } from 'mobx-react';
import { PropsWithChildren, useCallback, useEffect } from 'react';

import authApi from '@/services/auth';
import authStore from '@/stores/auth/AuthStore';

const Authenticated = ({ children }: PropsWithChildren) => {
  const fetchUser = useCallback(async () => {
    if (authStore.accessToken && !authStore.currentUser) {
      const user = await authApi.getAuthInfo();
      if (user) {
        authStore.setCurrentUser(user);
      }
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <>{children}</>;
};

export default observer(Authenticated);
