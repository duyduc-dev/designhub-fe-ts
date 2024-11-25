import { Navigate } from 'react-router-dom';

import { AppRoutes } from '@/constants/index.ts';
import AuthenticationLayout from '@/layouts/AuthenticationLayout/index.tsx';
import LoginPage from '@/pages/AuthPage/LoginPage';

export const authRoutes = {
  path: AppRoutes.AUTH,
  element: <AuthenticationLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={AppRoutes.LOGIN} />,
    },
    {
      path: AppRoutes.LOGIN,
      element: <LoginPage />,
    },
  ],
};
