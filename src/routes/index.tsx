import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, QuestionList, QuestionDetails } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      // {
      //   label: 'Home',
      //   icon: 'home',
      //   path: '/home',
      // },
      {
        label: 'Questions',
        icon: 'quiz',
        path: '/questions',
      },
      // {
      //   label: 'Questions Details',
      //   icon: 'quiz',
      //   path: '/questions/details:id',
      // },
    ]);
  }, []);

  return (
    <Routes>
      {/* <Route path="/home" element={<Dashboard />} /> */}
      <Route path="/questions" element={<QuestionList />} />
      <Route path="/questions/details/:id" element={<QuestionDetails />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
