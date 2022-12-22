// import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  //   const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Routes>
      <Route path="/start-page" element={<p>Start page</p>} />
      <Route path="*" element={<Navigate to="/start-page" />} />
    </Routes>
  );
};
