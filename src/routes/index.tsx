import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Authenticated from '@/components/Authenticated/index.tsx';
import { AppRoutes } from '@/constants/index.js';
import CommonLayout from '@/layouts/CommonLayout';
import DesignLayout from '@/layouts/DesignLayout';
import MainLayout from '@/layouts/MainLayout';
import { authRoutes } from '@/pages/AuthPage';
import DesignPage from '@/pages/DesignPage';
import HomePage from '@/pages/HomePage';
import ProjectsPage from '@/pages/ProjectsPage';

const rootRoutes = createBrowserRouter([
  {
    path: AppRoutes.ROOT,
    element: <CommonLayout />,
    children: [
      {
        path: AppRoutes.ROOT,
        element: (
          <Authenticated>
            <Outlet />
          </Authenticated>
        ),
        children: [
          {
            path: AppRoutes.ROOT,
            element: <MainLayout />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: AppRoutes.PROJECTS,
                element: <ProjectsPage />,
              },
            ],
          },
          {
            path: AppRoutes.DESIGN,
            element: <DesignLayout />,
            children: [
              {
                index: true,
                element: <DesignPage />,
              },
            ],
          },
        ],
      },

      authRoutes,
    ],
  },
]);

const RootRouter = () => <RouterProvider router={rootRoutes} />;

export default RootRouter;
