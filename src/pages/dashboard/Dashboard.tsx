import React from 'react';
import { ToolsDetails } from '../../shared/components/tools-details/ToolsDetails';
import { BaseLayoutPage } from '../../shared/layout';

export const Dashboard = () => {
  return (
    <BaseLayoutPage
      title="Home"
      //   navBar={<ToolsList showSearchInput={false} showBackListQuestions />}
      navBar={<ToolsDetails />}
    >
      test
    </BaseLayoutPage>
  );
};
