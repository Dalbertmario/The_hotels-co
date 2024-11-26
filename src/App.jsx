import React from 'react';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Applayout from './ui/Applayout';
import Cabins from './pages/Cabins';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Details from './pages/Details';

const App = () => {
  const query = new QueryClient();
  const routes = createBrowserRouter([
    {
      element: <Applayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/cabins', element: <Cabins /> },
        { path: '/bookings', element: <Bookings /> },
        { path: '/login', element: <Login /> },
        { path: '/setting', element: <Settings /> },
        { path: '/bookings/:id', element: <Details /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={query}>
      <RouterProvider router={routes} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 2000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'gray',
            color: 'white',
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
