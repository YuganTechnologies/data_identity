// src/App.js
import React from 'react';
import { MantineProvider } from '@mantine/core';
import AppRoutes from './routes/Routes';
import { Toaster } from 'react-hot-toast';
import FullScreenLoader from './components/Common/FullScreenLoader';

const App = () => {
  return (
    <MantineProvider>
      <AppRoutes />
      <Toaster />
      <FullScreenLoader />
    </MantineProvider>
  );
};

export default App;
