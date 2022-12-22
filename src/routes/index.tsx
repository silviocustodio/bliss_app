// import { Button } from '@mui/material';
import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  //   const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Routes>
      <Route
        path="/start-page"
        element={
          <Button variant="contained" color="primary">
            Test
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/start-page" />} />
    </Routes>
  );
};
