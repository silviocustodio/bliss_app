import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, QuestionList } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

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
      <Route path="/home" element={<Dashboard />} />
      <Route path="/questions" element={<QuestionList />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
