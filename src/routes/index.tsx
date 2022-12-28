import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QuestionList, QuestionDetails } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Questions',
        icon: 'quiz',
        path: '/questions',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/questions" element={<QuestionList />} />
      <Route path="/questions/details/:id" element={<QuestionDetails />} />
      <Route path="*" element={<Navigate to="/questions" />} />
    </Routes>
  );
};
