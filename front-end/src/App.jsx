import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Applayout from './ui/Applayout';
import Cabins from './pages/Cabins';
import Bookings from './pages/Bookings';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Details from './pages/Details';
import Users from './pages/Users';
import AccountDetails from './pages/AccountDetails';
import LoginCred from './pages/LoginCred';
import Newbookings from './ui/Newbookings';

const App = () => {
  const query = new QueryClient();
  const routes = createBrowserRouter([
    { path: '/login', element: <LoginCred /> },
    {
      element: <Applayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/cabins', element: <Cabins /> },
        { path: '/bookings', element: <Bookings /> },
        { path: '/bookings/:id', element: <Details /> },
        { path: '/users', element: <Users /> },
        { path: '/account', element: <AccountDetails /> },
        { path: '/newbook', element: <Newbookings /> },
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
