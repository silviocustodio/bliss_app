import React from 'react';
import { ToolsList } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layout';

export const Dashboard = () => {
  return (
    <BaseLayoutPage
      title="Home"
      navBar={<ToolsList showSearchInput={false} showBackListQuestions />}
    >
      test
    </BaseLayoutPage>
  );
};
