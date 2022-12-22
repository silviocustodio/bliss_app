// import { Button } from '@mui/material';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Home',
        icon: 'home',
        path: '/home',
      },
      {
        label: 'Questions',
        icon: 'quiz',
        path: '/questions',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawerOpen}
          >
            Test Drawer
          </Button>
        }
      />
      <Route
        path="/questions"
        element={
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawerOpen}
          >
            Test Drawer2
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
